import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch'
import { JagexItemPriceQueryResponse, JagexItemQueryItemInfo, JagexItemQueryResponse } from "./types/itemQuery.types";
import { ItemService } from "../item/item.service";
import { PriceService } from "../price/price.service";

@Injectable()
export class ItemFetcherService {
  dos_on_first_pass = 20
  delay_ms_in_deep_price_search = 1000
  headers= new fetch.Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "GE-Spy-valtteri459"
  })
  baseurlItemdb = "https://secure.runescape.com/m=itemdb_oldschool"
  baseurlPrices = "https://prices.runescape.wiki"

  constructor(private readonly itemService: ItemService, private readonly priceService: PriceService) {
    //REMOVE LATER FROM CONSTRUCTOR, SHOULD ONLY BE EXECUTED RARELY ON SCHEDULE
    if(process.env.RUN_ITEM_GETTER_ON_START)
    this.getAllItems()

    this.getItemPrices()
  }

  getAllItems() {
    console.log('starting Item database update')
    this.request(this.baseurlPrices+'/api/v1/osrs/mapping', 'GET').then(async (res) => {
      let searchRaw = await res.text()
      let searchParsed: JagexItemQueryResponse
      try {
        searchParsed = (JSON.parse(searchRaw) as JagexItemQueryResponse)
      } catch(e) {
        console.error('INVALID JSON IN API RESPONSE: ', searchRaw, res)
        throw new Error("INVALID_JSON")
      }
      console.log('request complete, saving to database...')
      await this.itemService.saveMany(searchParsed.map(itm => ({
        id: itm.id,
        name: itm.name,
        description: itm.examine,
        purchaseLimit: itm.limit,
        lowAlchemy: itm.lowalch,
        highAlchemy: itm.highalch,
        shopPrice: itm.value,
        members: itm.members
      })))
      console.log('Item database updated')
    }).catch(e => {
      console.error("error fetching oldschool item catalog", e)
    })
  }

  getItemPrices(timestamp: number | null = null, searchDepth: number = 1, previousTimestamp: number | null = null) {
    this.request(`${this.baseurlPrices}/api/v1/osrs/5m${timestamp ? `?timestamp=${timestamp}` : ''}`, 'GET').then(async (res) => {
      let searchRaw = await res.text()
      let searchParsed: JagexItemPriceQueryResponse
      try {
        searchParsed = (JSON.parse(searchRaw) as JagexItemPriceQueryResponse)
      } catch(e) {
        console.error('INVALID JSON IN API RESPONSE: ', searchRaw, res)
        throw new Error("INVALID_JSON")
      }
      const foundData = searchParsed.data
      const itemIds = Object.keys(foundData)
      if(previousTimestamp != searchParsed.timestamp) {
        await this.priceService.saveMany(itemIds.map(e => ({
          itemId: parseInt(e),
          timestamp: searchParsed.timestamp,
          highPrice: foundData[e].avgHighPrice,
          lowPrice: foundData[e].avgLowPrice,
          highVolume: foundData[e].highPriceVolume,
          lowVolume: foundData[e].lowPriceVolume
        })))
      } else {
        console.log('skipping save, data not updated yet')
      }
      if(!timestamp){
        const now = Math.floor(new Date().getTime()/1000)
        const parsedNextTime = Math.max(
          (((searchParsed.timestamp+550)-now)*1000)+5000, //estimated future plus 5 seconds extra
          5000 //or 5 seconds, whichever is larger
        )
        console.log('Next fresh data scheduled ',parsedNextTime/1000, ' seconds into the future')
        setTimeout(() => this.getItemPrices(null, 1, searchParsed.timestamp), parsedNextTime)
      }
      if(--searchDepth > 0) {
        console.log('recursive mode on, going back 300 seconds(5min) from last fetch. searches left: ', searchDepth)
        setTimeout(() => this.getItemPrices(searchParsed.timestamp - 300, searchDepth))
      }
    }).catch(e => {
      console.error("error fetching oldschool item price data", e)
    })
  }

  async request(url: string, method: string) {
    return fetch(url, {method: method, headers: this.headers})
  }
}