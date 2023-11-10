import { Module } from '@nestjs/common';
import { ItemFetcherService } from './item-fetcher.service';

@Module({
  providers: [ItemFetcherService]
})
export class ItemFetcherModule {}
