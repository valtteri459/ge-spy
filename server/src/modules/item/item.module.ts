import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './item.controller';
import { ItemMetadataService } from './item.metadata.service';

@Module({
  
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemMetadataService],
  controllers: [ItemController],
  exports: [ItemService, ItemMetadataService]
})
export class ItemModule {}
