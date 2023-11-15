import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { PriceController } from './price.controller';
import { ItemModule } from '../item/item.module';

@Module({
  
  imports: [TypeOrmModule.forFeature([Price]), ItemModule],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [PriceService]
})
export class PriceModule {}
