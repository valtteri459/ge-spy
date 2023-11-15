import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common'
import { ItemService } from './item.service'
import { Item } from './entities/item.entity'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { ItemDto } from './dto/item-response.dto'
import { ItemMetadataService } from './item.metadata.service'

@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService, private readonly itemMetadata: ItemMetadataService) {}

  @Get('/')
  @ApiTags("OSRS Items")
  @ApiQuery({
    name: "name",
    description: "Part of item name, minimum 3 characters",
    type: String
  })
  async getItems(@Query("name") searchName: string): Promise<ItemDto[]> {
    if(searchName.length < 2) {
      throw new UnprocessableEntityException("search name too short")
    }
    const itemPrefix = await this.itemMetadata.getImagePrefixes()
    return (await this.itemService.findAll(searchName)).map(e => ({...e, icon: itemPrefix.icon + e.id, icon_large: itemPrefix.icon_large + e.id}))
  }
}
