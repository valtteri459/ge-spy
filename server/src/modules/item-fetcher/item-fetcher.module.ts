import { Module } from '@nestjs/common';
import { ItemFetcherService } from './item-fetcher.service';
import { ItemModule } from '../item/item.module';

@Module({
  imports:[ItemModule],
  providers: [ItemFetcherService]
})
export class ItemFetcherModule {}
