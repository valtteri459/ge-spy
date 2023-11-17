import { Module } from '@nestjs/common';
import { ItemFetcherService } from './item-fetcher.service';
import { ItemModule } from '../item/item.module';
import { PriceModule } from '../price/price.module';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports:[ItemModule, PriceModule, RealtimeModule],
  providers: [ItemFetcherService],
  exports: [ItemFetcherService]
})
export class ItemFetcherModule {}
