const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const proxy = require("express-http-proxy");
const config = require("./config.js")

const app = express()
app.use(bodyParser.json());

require("./routes")(app);
if(config.proxyMode)
app.use("/", proxy("localhost:8080"));
else
console.log("plese put proxyMode on for now")

app.listen(config.port);