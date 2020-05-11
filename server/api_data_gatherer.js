console.log("data gatherer imported")
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
                currentPrices.push([elem.id, new Date().getTime(), 
                    elem.overall_average, elem.buy_average, elem.sell_average, elem.buy_quantity, 
                    elem.sell_quantity, false])
            })
            
            var sql = "INSERT INTO items (id, name, members, storePrice) VALUES ? ON DUPLICATE KEY UPDATE name = name"
            db.query(sql, [bulkItems], function(err) {
                if (err)
                console.log("error in updating items:", err)
                else
                console.log("items added to database")
                var sqlTwo = "INSERT INTO itemPrices (item, timeStamp, osbOverall, osbBuy, osbSell, buy_quantity, sell_quantity, accurate) VALUES ?"
                db.query(sqlTwo, [currentPrices], function(errTwo) {
                    if (errTwo) {
                        console.log("Error adding prices:",errTwo)
                    } else {
                        console.log("price adjustment updated to db (osb)", new Date().toISOString())
                    }
                    var sqlThree = "DELETE FROM itemPrices WHERE timeStamp < ? AND accurate = 0"
                    db.query(sqlThree, new Date().getTime() - 1209600000, function(errThree) {
                        if( errThree ) {
                            console.log("error deleting old rapidData: ", errThree)
                        } else {
                            console.log("purged week old 10min accurate price records")
                        }
                    })
                })
            })
        })
        
    },
    loadGraphs: (db, full = false) => {
        if(full) {
            console.log("doing big check!!!!!!")
        } else {
            console.log("updating prices from last 6 hours to 3 hour specific storage")
        }
        console.log("updating long term price database now...")
        axios.get('https://rsbuddy.com/exchange/summary.json').then((allItems) => {
            var bulkItems = []
            var currentPrices = []
            var delay = 0
            var queued = 0
            var queried = 0
            var completed = 0
            var solved = false
            var getSolved = () => { return solved }
            var itemsLength = Object.keys(allItems.data).length
            Object.keys(allItems.data).forEach(key => {
                var elem = allItems.data[key]
                bulkItems.push([elem.id, elem.name, elem.members, elem.sp])
                currentPrices.push(new Promise((resolve, reject) => {
                    delay += 250
                    queued++
                    setTimeout(() => {
                        queried++
                        if(queried%250 == 0 || queried == itemsLength){
                            console.log("queried ", queried + '/' + itemsLength)
                        }
                        axios.get('https://rsbuddy.com/exchange/graphs/4320/' + elem.id + '.json').then(resultData => {
                            completed++
                            if (completed % 250 == 0 || completed == itemsLength) {
                                console.log("completed ", completed + '/' + itemsLength)
                            }
                            var output = []
                            var toSlice = full ? null : -2
                            resultData.data.slice(toSlice).forEach(individualPriceElement => {
                                output.push(
                                    [
                                        elem.id, 
                                        individualPriceElement.ts, 
                                        individualPriceElement.overallPrice, 
                                        individualPriceElement.buyingPrice, 
                                        individualPriceElement.sellingPrice, 
                                        individualPriceElement.buyingQuantity, 
                                        individualPriceElement.sellingQuantity, true]
                                )
                            })
                            resolve(output)
                        }).catch(e => { 
                            if (!e.response && e.code !== 'ECONNREFUSED') { 
                                reject(e) 
                            } else if (e.code == 'ECONNREFUSED') {
                                console.log(elem.id, 'conn refused')
                                resolve([])
                            } else if(e.response.status !== 500) {
                                reject(e) 
                            } else {
                                console.log(elem.id, 'issue updating, err 500', e.response.data)
                                resolve([])
                            }
                        })
                    }, delay)
                }))
            })

            var sql = "INSERT INTO items (id, name, members, storePrice) VALUES ? ON DUPLICATE KEY UPDATE name = name"
            db.query(sql, [bulkItems], function (err) {
                if (err)
                    console.log("error in updating items:", err)
                else
                    console.log("items added to database")
                var sqlTwo = `INSERT INTO itemPrices 
                (item, timeStamp, osbOverall, osbBuy, osbSell, buy_quantity, sell_quantity, accurate) 
                VALUES ? ON DUPLICATE KEY UPDATE 
                osbOverall = VALUES(osbOverall),
                osbBuy = VALUES(osbBuy),
                osbSell = VALUES(osbSell),
                buy_quantity = VALUES(buy_quantity),
                sell_quantity = VALUES(sell_quantity),
                accurate = 1`
                Promise.all(currentPrices).then(cpRes => {
                    solved = true
                    var loopable = []
                    cpRes.forEach(elem => {
                        loopable = loopable.concat(elem)
                    })
                    console.log("adding long term information")
                    db.query(sqlTwo, [loopable], function (errTwo) {
                        if (errTwo) {
                            console.log("Error adding price graphs:", errTwo)
                        } else {
                            console.log("accurate price graph updates (osb) added to db", new Date().toISOString())
                        }
                    })
                }).catch(e => { console.log("error in updating: ", e); solved=false })

            })
        })
    }
}