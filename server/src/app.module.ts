import { Module } from '@nestjs/common';
import { ItemFetcherModule } from './modules/item-fetcher/item-fetcher.module';

@Module({
  imports: [ItemFetcherModule],
})
export class AppModule {}
