import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch'
import { JagexItemCategoryQueryResponse } from "./types/itemQuery.types";

@Injectable()
export class ItemService {
  headers= new fetch.Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "GE-Spy-valtteri459"
  })
  items = []
  baseurl = "https://secure.runescape.com/m=itemdb_oldschool"
  constructor() {
    console.log('hehe')
    this.getAllItems()
    this.getItemsByCategory('y', 1)
  }
  getAllItems() {
    this.request("/api/catalogue/category.json?category=1", 'GET').then(async (res) => {
      let searchCategories = (await res.json() as JagexItemCategoryQueryResponse).alpha
      console.log(searchCategories.filter(e => e.items > 0))
    }).catch(e => {
      console.error("error fetching oldschool item catalog", e)
    })
  }
  getItemsByCategory(letter: string, page: number) {
    this.request(`/api/catalogue/items.json?category=1&page=${page}&alpha=${encodeURIComponent(letter)}`, 'GET').then(async (res) => {
      console.log(await res.json())
    }).catch(e => {
      console.error("error updating items in category", e, letter, page)
    }) 
  }
  async request(url: string, method: string) {
    return fetch(this.baseurl+url, {method: method, headers: this.headers})
  }
}