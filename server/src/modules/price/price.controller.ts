import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common'
import { PriceService } from './price.service'
import { Price } from './entities/price.entity'
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { PriceDto } from './dto/price-response.dto'
import { ItemService } from '../item/item.service'
import { priceRequestDto } from './dto/price-request.dto'

@Controller('/api/prices')
export class PriceController {
  constructor(private readonly priceService: PriceService, private readonly itemService: ItemService) {}

  @Get('/:id/:start/:end')
  @ApiTags("OSRS Prices")
  @ApiOkResponse({type: PriceDto})
  async getItemPrice(@Param() values: priceRequestDto): Promise<PriceDto> {
    return {data: await this.priceService.getPriceDataOfItem(values.id, values.start, values.end), startTime: values.start, endTime: values.end}
  }
}
