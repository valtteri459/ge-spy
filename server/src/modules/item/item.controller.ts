import { Body, Controller, Delete, Get, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common'
import { ItemService } from './item.service'
import { Item } from './entities/item.entity'

@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  async getItems(): Promise<Item[]> {
    return await this.itemService.findAll()
  }
}
