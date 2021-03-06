const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require("./config.js")
const mysql = require("mysql")
const scanner = require("./api_data_gatherer.js")

const app = express()
app.use(cors())
app.use(bodyParser.json());

var db = mysql.createConnection({
    host:       config.mysqlHost,
    user:       config.mysqlUser,
    password:   config.mysqlPass,
    database:   config.mysqlBase
})
db.connect((err)=>{
    if(err){
        console.log("UNABLE TO MAKE DATABASE CONNECTION", err)
    } else {
        require("./routes")(app, db);
        if(!config.noScan) {
            setInterval(() => { scanner.loadData(db) }, 600000)
            setInterval(() => { scanner.loadGraphs(db) }, 1000*60*60)
        } else {
            console.log("scanner not started, noScan set to true")
        }
        if (config.scanOnStartup) {
            scanner.loadData(db)
            scanner.loadGraphs(db, true)
        }
    }
})



app.listen(config.port, () => {
    console.log("listening on port: "+config.port)
});