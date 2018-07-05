//copy and rename to config.js
module.exports = {
    mysqlHost: '',
    mysqlBase: '',
    mysqlUser: '',
    mysqlPass: '',
    proxyMode: true,//should UI be proxied from webpack-dev-server project or use local build
    noScan: false, //disables price scanning, useful for database clients that don't update info
    port: 5000 //port to serve webapp on
}