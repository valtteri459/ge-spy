import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common'
import { ItemService } from './item.service'
import { Item } from './entities/item.entity'
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ItemDto } from './dto/item-response.dto'

@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  @ApiTags("OSRS Items")
  @ApiQuery({
    name: "name",
    description: "Part of item name, minimum 3 characters",
    type: String
  })
  @ApiOkResponse({
    type:ItemDto,
    isArray: true
  })
  async getItems(@Query("name") searchName: string): Promise<ItemDto[]> {
    if(searchName.length < 2) {
      throw new UnprocessableEntityException("search name too short")
    }
    return (await this.itemService.findAll(searchName)).map(e => ({
      ...e, 
      icon: "https://secure.runescape.com/m=itemdb_oldschool/obj_sprite.gif?id=" + e.id, 
      icon_large: "https://secure.runescape.com/m=itemdb_oldschool/obj_big.gif?id=" + e.id
    }))
  }
}
