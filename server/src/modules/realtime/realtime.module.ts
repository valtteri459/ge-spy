import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { RealtimeService } from './realtime.service';
import { ItemModule } from '../item/item.module';

@Module({
  
  imports: [],
  providers: [RealtimeGateway, RealtimeService],
  exports: [RealtimeGateway]
})
export class RealtimeModule {}
