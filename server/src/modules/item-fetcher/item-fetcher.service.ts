import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch'
import { JagexItemCategoryQueryResponse, JagexItemQueryResponse } from "./types/itemQuery.types";
import { ItemService } from "../item/item.service";

@Injectable()
export class ItemFetcherService {
  API_PAGE_SIZE = 12
  API_THROTTLE_MS = 1000
  TOTAL_PAGES_SEARCHED = 0
  TOTAL_PAGES_ESTIMATE = 0
  TOTAL_FAILURES = 0

  headers= new fetch.Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "GE-Spy-valtteri459"
  })
  baseurl = "https://secure.runescape.com/m=itemdb_oldschool"
  resolvable_queue: (() => Promise<void>)[] = []

  constructor(private readonly itemService: ItemService) {
    //REMOVE LATER FROM CONSTRUCTOR, SHOULD ONLY BE EXECUTED RARELY ON SCHEDULE
    if(process.env.RUN_ITEM_GETTER_ON_START)
    this.getAllItems()
    
  }

  resolve_queue_with_throttle() {
    const firstInLine = this.resolvable_queue.shift()
    if(firstInLine) {
      firstInLine().then(() => {
        setTimeout(() => this.resolve_queue_with_throttle(), this.API_THROTTLE_MS)
      })
    } else {
      console.log('queue empty')
    }
  }

  getAllItems() {
    this.request("/api/catalogue/category.json?category=1", 'GET').then(async (res) => {
      let searchCategoriesRaw = await res.text()
      let searchCategories: JagexItemCategoryQueryResponse["alpha"]
      try {
        searchCategories = (JSON.parse(searchCategoriesRaw) as JagexItemCategoryQueryResponse).alpha
      } catch(e) {
        console.error('INVALID JSON IN API RESPONSE: ', searchCategoriesRaw, res)
        throw new Error("INVALID_JSON")
      }
      
      let validCategories = searchCategories.filter(e => e.items > 0)
      this.TOTAL_PAGES_ESTIMATE = Math.ceil(searchCategories.map(e => e.items).reduce(((p, c) => p+c), 0)/12)
      validCategories.forEach(category => 
        this.resolvable_queue.push(() => this.getItemsByCategory(category.letter, 1, category.items))
      )
      this.resolve_queue_with_throttle()
    }).catch(e => {
      console.error("error fetching oldschool item catalog", e)
    })
  }

  getItemsByCategory(letter: string, page: number, totalFromCategoryQuery: number, skipNext: boolean = false): Promise<void> {
    return this.request(`/api/catalogue/items.json?category=1&page=${page}&alpha=${encodeURIComponent(letter)}`, 'GET').then(async (res) => {
      let apiResponse = await res.text()

      try {
        apiResponse = JSON.parse(apiResponse)
      } catch(e) {
        console.error(`INVALID JSON IN API RESPONSE, probably at rate limit:  letter: "${letter}" page: ${page}`)
        this.API_THROTTLE_MS = Math.ceil(this.API_THROTTLE_MS*1.2)
        throw new Error('INVALID_JSON')
      }
      //console.log(apiResponse.items)
      this.itemService.saveMany(apiResponse.items.map(e => ({...e, members: e.members === 'true'}))).then(() => {
        console.log(`TOTAL: ${++this.TOTAL_PAGES_SEARCHED}/${this.TOTAL_PAGES_ESTIMATE} | item page for letter "${letter}" ${page}/${Math.ceil(totalFromCategoryQuery/this.API_PAGE_SIZE)} saved | FAILURES: ${this.TOTAL_FAILURES} DELAY MS: ${this.API_THROTTLE_MS}`)
      }).catch(e => {
        console.error(`DATABASE ITEM SAVE FAILED, retrying "${letter}" ${page}/${Math.ceil(totalFromCategoryQuery/this.API_PAGE_SIZE)}`)
        this.TOTAL_FAILURES++
        this.resolvable_queue.push(() => this.getItemsByCategory(letter, page, totalFromCategoryQuery, true))
      })
      
      if(page*this.API_PAGE_SIZE < totalFromCategoryQuery && !skipNext) {
        this.resolvable_queue.push(() => this.getItemsByCategory(letter, page+1, totalFromCategoryQuery))
      }
    }).catch(e => {
      e === "INVALID_JSON" ? undefined : console.error("error updating items in category", e, letter, page)
      this.TOTAL_FAILURES++
      this.resolvable_queue.push(() => this.getItemsByCategory(letter, page, totalFromCategoryQuery))
    }) 
  }

  async request(url: string, method: string) {
    return fetch(this.baseurl+url, {method: method, headers: this.headers})
  }
}