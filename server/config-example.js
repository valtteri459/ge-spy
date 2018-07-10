//copy and rename to config.js
module.exports = {
    mysqlHost: '',
    mysqlBase: '',
    mysqlUser: '',
    mysqlPass: '',
    proxyMode: true,//should UI be proxied from webpack-dev-server project or use local build
    noScan: false, //disables price scanning, useful for database clients that don't update info
    scanOnStartup: false, //set to true if you want to fetch newest price info to db on service start
    port: 5000 //port to serve webapp on
}