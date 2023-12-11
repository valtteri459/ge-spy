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

  private async queryHistory(item: number, interval: string) {
    /**SELECT 
        AVG(price."highPrice") AS "highPrice", 
        COUNT(*) AS "records",
        AVG(price."lowPrice") AS "lowPrice", 
        SUM(price."highVolume") AS "highVolume", 
        SUM(price."lowVolume") AS "lowVolume",
        TO_TIMESTAMP((ARRAY_AGG("timestamp" ORDER BY "timestamp" ASC))[1]) AS "time",
        FLOOR(EXTRACT(epoch FROM TO_TIMESTAMP(price."timestamp")) / EXTRACT(epoch FROM INTERVAL '1 hr')) AS "time_bucket" 
      FROM price 
      WHERE price."itemId" = 2 

      GROUP BY time_bucket

      ORDER BY "time" ASC */
  }
  async allTimePriceDataOfItem(item: number) {

  }
  async lastYear(item: number) {

  }
  async lastQuarter(item: number) {

  }
  async lastMonth(item: number) {

  }
  async lastWeek(item: number) {

  }
  async lastDay(item: number) {

  }
  async save(price: Price): Promise<Price> {
    return this.priceRepository.save(price)
  }

  async saveMany(prices: Price[]): Promise<Price[]> {
    return this.priceRepository.save(prices)
  }
}