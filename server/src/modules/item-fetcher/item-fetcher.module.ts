import { Module } from '@nestjs/common';
import { ItemFetcherService } from './item-fetcher.service';
import { ItemModule } from '../item/item.module';
import { PriceModule } from '../price/price.module';

@Module({
  imports:[ItemModule, PriceModule],
  providers: [ItemFetcherService]
})
export class ItemFetcherModule {}
