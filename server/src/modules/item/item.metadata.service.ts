import { Injectable } from '@nestjs/common';
import { JagexItemQueryItemInfo } from '../item-fetcher/types/itemQuery.types';
import fetch from 'node-fetch'


@Injectable()
export class ItemMetadataService {
  constructor() {
    this.updateImagePrefix()
  }
  smallImagePrefix: string = "https://secure.runescape.com/m=itemdb_oldschool/1700044427903_obj_sprite.gif?id="
  largeImagePrefix: string = "https://secure.runescape.com/m=itemdb_oldschool/1700044427903_obj_big.gif?id=="
  async getImagePrefixes(): Promise<{icon: string, icon_large: string}> {
    return {icon: this.smallImagePrefix, icon_large: this.largeImagePrefix}
  }

  async updateImagePrefix() {
    fetch('https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2')
    .then(res => res.json())
    .then((res) => {
      const item = res.item as JagexItemQueryItemInfo
      this.smallImagePrefix = item.icon.slice(0, -1)
      this.largeImagePrefix = item.icon_large.slice(0, -1)
      setTimeout(() => this.updateImagePrefix(), 10000)
    }).catch(e => {
      console.error("UNABLE TO UPDATE ITEM IMAGE PREFIX INFO", e)
      setTimeout(() => this.updateImagePrefix(), 500)
    })
  }
}