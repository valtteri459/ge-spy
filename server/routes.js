const config = require("./config.js")
const proxy = require("express-http-proxy");
const axios = require("axios")
var lastRes = ""
var lastScan = 0
console.log("routes loaded")
module.exports = (app, db) =>{
    app.get("/api/imagePrefix", (req, res) => {
        //http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2"
        if(new Date().getTime()-6000>lastScan)
        {
            axios.get('http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2').then(elem =>{
                res.send(JSON.stringify({imagePrefix: elem.data.item.icon_large.slice(0, -1)}))
                lastScan = new Date().getTime()
                lastRes = elem.data.item.icon_large.slice(0, -1)
            })
        }
        else
        {
            res.send(JSON.stringify({imagePrefix: lastRes, cached: true}))
        }
    })
    app.get("/api/catalog", (req, res) => {
        db.query(`SELECT * FROM items`, (err, results, fields) => {
            if (err) {
                res.status(500).send(err)
            }
            res.send(JSON.stringify(results))
        })
    })
    app.get("/api/itemHistory/:itemId/:startTime/:endTime", (req, res) => {
        //gets price history of item from startTime to endTime
        db.query(`SELECT timeStamp, osbOverall, osbBuy, osbSell, buy_quantity, sell_quantity FROM itemPrices WHERE item = ? AND timeStamp > ? AND timeStamp < ? LIMIT 1000`, [req.params.itemId, req.params.startTime, req.params.endTime], (err, results, fields) => {
            if (err) {
                res.status(500).send(err)
            }
            res.send(JSON.stringify(results))
        })
    })
    app.get("/api/item/:itemId", (req, res) => {
        //gets item and it's latest price data
        db.query(`SELECT 
                    items.id, items.name, 
                    items.members, items.storePrice, 
                    itemPrices.timeStamp, itemPrices.osbOverall, 
                    itemPrices.osbBuy,  itemPrices.osbSell, 
                    itemPrices.buy_quantity, itemPrices.sell_quantity 
                    FROM items 
                    JOIN itemPrices 
                    ON timeStamp = (SELECT timeStamp FROM itemPrices WHERE item = items.id ORDER BY timeStamp DESC LIMIT 1) 
                    AND itemPrices.item = items.id WHERE items.id = ?`, req.params.itemId, (err, results, fields) => {
            if (err) {
                res.status(500).send(err)
            }
            res.send(JSON.stringify(results[0] || {Unknown: true}))
        })
    })
    if(config.proxyMode)
    app.use("/", proxy("localhost:8080"));
    else
    console.log("support for generated artifacts not yet added")
}