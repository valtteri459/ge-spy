import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer,  } from '@nestjs/websockets';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';
import { Server, Socket } from 'socket.io';
import { ItemService } from '../item/item.service';
import { isString } from 'class-validator';
import { ItemDto } from '../item/dto/item-response.dto';
import { RealTimePriceUpdateDto, RealTimeItemSearchDto } from './dto/realtime-gateway.dto';
import { UnstablePriceData, UnstablePriceStructure } from '../item-fetcher/types/unstable-prices.types';
import { ItemFetcherService } from '../item-fetcher/item-fetcher.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway{
  constructor(){}

  @WebSocketServer()
  server: Server

  /** Unstable prices */
  @AsyncApiSub({
    channel: 'api/unstablePrices',
    message: [{
      payload: RealTimePriceUpdateDto,
    }]
  })
  async emitRealTimePriceUpdates(prices: RealTimePriceUpdateDto, client: Socket | Server) {
    client.emit('api/unstablePrices', prices);
  }

  async publishPriceUpdate(prices: UnstablePriceStructure) {
    return this.emitRealTimePriceUpdates({data: [...prices]}, this.server)
  }
}
