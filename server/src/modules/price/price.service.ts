import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, ILike, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { ItemService } from '../item/item.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    private readonly itemService: ItemService
  ) {}
  
  async getPriceDataOfItem(item: number, startTime: number, endTime: number): Promise<Price[]> {
    return await this.priceRepository.findBy({
      itemId: item,
      timestamp: And(MoreThanOrEqual(startTime), LessThanOrEqual(endTime))
    })
  }
  async save(price: Price): Promise<Price> {
    return this.priceRepository.save(price)
  }

  async saveMany(prices: Price[]): Promise<Price[]> {
    return this.priceRepository.save(prices)
  }
}