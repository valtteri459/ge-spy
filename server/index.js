const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const proxy = require("express-http-proxy");

const app = express()
app.use(bodyParser.json());

require("./routes")(app);
app.use("/", proxy("localhost:8080"));
app.listen(8081);