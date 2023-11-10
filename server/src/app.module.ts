import { Module } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [ItemModule],
})
export class AppModule {}
