const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const objection = require('./objection');

const app = express(feathers());
const axios = require('axios')
const schedule = require('node-schedule')
var lastRes = ""
var lastScan = 0

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));
app.get("/imagePrefix", (req, res) => {
  //http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2"
  if(new Date().getTime()-6000>lastScan)
  {
      axios.get('http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2').then(elem =>{
          res.send(JSON.stringify({imagePrefix: elem.data.item.icon_large.slice(0, -1).replace('http://', 'https://')}))
          lastScan = new Date().getTime()
          lastRes = elem.data.item.icon_large.slice(0, -1).replace('http://', 'https://')
      })
  }
  else
  {
      res.send(JSON.stringify({imagePrefix: lastRes, cached: true}))
  }
})

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(objection);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);
var fetchItems = () => {
  console.log(new Date(), 'fetching items and refreshing item prices')
  axios.get('https://rsbuddy.com/exchange/summary.json').then((allItems) => {
    var items = []
    var updatePromises = []

    Object.keys(allItems.data).forEach(key => {
      var elem = allItems.data[key]
      items.push(elem)
    })
    var itemsService = app.service('items')
    items.forEach(item => {
      updatePromises.push(new Promise((resolve, reject) => {
        itemsService.create({
          id: item.id,
          name: item.name,
          members: item.members,
          overall: item.overall_average,
          osbBuy: item.buy_average,
          osbSell: item.sell_average,
          storePrice: item.sp || 0
        }).then(() => {
          resolve()
        }).catch(e => {
          reject({error: e, metadata: 'stage 1', errorObject: item})
        })
      }))
    })
    Promise.all(updatePromises).then(() => {
      console.log((new Date()).toLocaleString(), 'all entries updated')
    }).catch(e => {
      console.log((new Date()).toLocaleString(), 'error in inserting items', e)
    })
  }).catch(e => {
    console.log((new Date()).toLocaleString(), 'ERROR GETTING ITEM DATA: ', e)
  })
}
var fetchGraphs = (allEntries = false) => {
  console.log(new Date(), 'doing graph fetch with allentries being: ', allEntries)
  var delay = 0
  var queued = 0
  var queried = 0
  var completed = 0
  var itemsService = app.service('items')
  var itemPService = app.service('item-prices')
  itemsService.find({query: {$limit:5000}}).then(e => {
    var itemsLength = e.data.length
    e.data.forEach(item => {
      delay += 250
      queued++
      setTimeout(() => {
        queried++
        if(queried%250 == 0 || queried == itemsLength){
          console.log("queried ", queried + '/' + itemsLength)
        }
        axios.get('https://rsbuddy.com/exchange/graphs/180/' + item.id + '.json').then(resultData => {
          var toSlice = allEntries ? null : -2
          Promise.all(resultData.data.slice(toSlice).map(individualPriceElement => {
            individualPriceElement.id = item.id
            return new Promise((resolve, reject) => {
              itemPService.create({
                item: individualPriceElement.id,
                timestamp: individualPriceElement.ts,
                overall: individualPriceElement.overallPrice || 0,
                osbBuy: individualPriceElement.buyingPrice || null,
                osbSell: individualPriceElement.sellingPrice || null,
                buy_quantity: individualPriceElement.buyingQuantity || null,
                sell_quantity: individualPriceElement.sellingQuantity || null
              }).then(() => {
              }).catch((e) => {
                console.log('ERROR SAVING ITEM ID ', item.id, 'PRICE DATA TO DB', e, individualPriceElement)
              }).finally(() => {
                resolve()
              })
            })
          })).catch(e => {
            console.log('error in item price data insertion vol.2', e)
          })
        }).catch(e => {
          if (!e.code && !e.response) {
            console.log('unknown error', e)
          } else if (!e.response && e.code !== 'ECONNREFUSED') { 
            console.log('no response and unknown errorcode', item.id, e.code)
          } else if (e.code == 'ECONNREFUSED') {
            console.log('Connection refused for: ', item.id)
          } else if(e.response.status !== 500) {
            console.log(e.response.status, 'status code for item id', item.id)
          } else {
            console.log(item.id, 'issue updating, err 500, probably just broken item as usual')
          }
        }).finally(() => {
          completed++
          if (completed % 250 == 0 || completed == itemsLength) {
              console.log("completed ", completed + '/' + itemsLength)
          }
        })
      }, delay)
    })
  }).catch(e => {
    console.log('Error getting items', e)
  })
}
oldSetup = app.setup
app.setup = function (...args) {
  const results = oldSetup.apply(this, args)
  fetchItems()
  schedule.scheduleJob('*/10 * * * *', () => {fetchItems()})
  schedule.scheduleJob('1 * * * *', () => {fetchGraphs()})

  return results
}
module.exports = app;
