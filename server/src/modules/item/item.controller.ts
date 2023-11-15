import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common'
import { ItemService } from './item.service'
import { Item } from './entities/item.entity'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

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
  async getItems(@Query("name") searchName: string): Promise<Item[]> {
    if(searchName.length < 2) {
      throw new UnprocessableEntityException("search name too short")
    }
    return await this.itemService.findAll(searchName)
  }
}
