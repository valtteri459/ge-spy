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
  axios.get('https://rsbuddy.com/exchange/summary.json').then((allItems) => {
    var items = []
    var updatePromises = []
    Object.keys(allItems.data).forEach(key => {
      var elem = allItems.data[key]
      items.push(elem)
    })
    var itemsService = app.service('items')
    items.forEach(item => {
      itemsService.get(item.id).then(dbItem => {
      }).catch(() => {
        updatePromises.push(new Promise((resolve, reject) => {
          itemsService.create({
            id: item.id,
            name: item.name,
            members: item.members,
            storePrice: item.sp || 0
          }).then(() => {
            resolve()
          }).catch(e => {
            reject(e)
          })
        }))
      })
    })
    Promise.all(updatePromises).then(() => {
      console.log('all entries updated')
    }).catch(e => {
      console.log('error in inserting items')
    })
  }).catch(e => {
    console.log('ERROR GETTING ITEM DATA: ', e)
  })
}
var fetchGraphs = (longTime = false) => {

}
oldSetup = app.setup
app.setup = function (...args) {
  const results = oldSetup.apply(this, args)
  fetchItems()
  return results
}
module.exports = app;
