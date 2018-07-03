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

    })
    app.get("/api/itemHistory/:itemId/:startTime/:endTime", (req, res) => {

    })
    if(config.proxyMode)
    app.use("/", proxy("localhost:8080"));
    else
    console.log("support for generated artifacts not yet added")
}