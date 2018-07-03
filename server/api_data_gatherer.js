console.log("data gatherer enableb")
var axios = require("axios")
module.exports = {
    loadData: (db) => {
        console.log("updating price database now...")
        axios.get('https://rsbuddy.com/exchange/summary.json').then((allItems) => {
            var bulkItems = []
            var currentPrices = []
            Object.keys(allItems.data).forEach(key => {
                var elem = allItems.data[key]
                bulkItems.push([elem.id, elem.name, elem.members, elem.sp])
                currentPrices.push([elem.id, new Date().getTime(), elem.overall_average, elem.buy_average, elem.sell_average, elem.buy_quantity, elem.sell_quantity])
            })
            
            var sql = "INSERT INTO items (id, name, members, storePrice) VALUES ? ON DUPLICATE KEY UPDATE name = name"
            db.query(sql, [bulkItems], function(err) {
                if (err)
                console.log("error in updating items:", err)
                else
                console.log("items added to database")
                var sqlTwo = "INSERT INTO itemPrices (item, timeStamp, osbOverall, osbBuy, osbSell, buy_quantity, sell_quantity) VALUES ?"
                db.query(sqlTwo, [currentPrices], function(errTwo) {
                    if (errTwo) {
                        console.log("Error adding prices:",errTwo)
                    } else {
                        console.log("price adjustment updated to db (osb)", new Date().toISOString())
                    }
                })
            })
        })
        
    }
}