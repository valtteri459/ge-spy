import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';
import { Server, Socket } from 'socket.io';
import { ItemService } from '../item/item.service';
import { isString } from 'class-validator';
import { ItemDto } from '../item/dto/item-response.dto';
import { RealTimePriceUpdateDto, RealtimeItemSearchDto } from './dto/realtime-gateway.dto';
import { UnstablePriceData, UnstablePriceStructure } from '../item-fetcher/types/unstable-prices.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway {
  constructor(
    private readonly itemService: ItemService
  ){}

  @WebSocketServer()
  server: Server


  @SubscribeMessage('api/searchItem')
  @AsyncApiPub({
    channel: 'api/searchItem',
    message: {
      payload: RealtimeItemSearchDto,
    },
  })
  async searchItem(
    @ConnectedSocket() client: Socket,
    @MessageBody() searchString: RealtimeItemSearchDto,
  ) {
    console.log(
      `data from client ${client.id} : ${JSON.stringify(searchString.name)}`,
    );
    if(searchString.name && isString(searchString.name) && searchString.name.length > 3 ) {
      const itemQueryResult = await this.itemService.findAll(searchString.name);
      await this.emitItemSearchResults(
        itemQueryResult.map(e => ({
          ...e, 
          icon: "https://secure.runescape.com/m=itemdb_oldschool/obj_sprite.gif?id=" + e.id, 
          icon_large: "https://secure.runescape.com/m=itemdb_oldschool/obj_big.gif?id=" + e.id
        }))
      , client);
    }
  }

  @AsyncApiSub({
    channel: 'api/searchItem',
    message: [{
      payload: ItemDto,
    }]
  })
  async emitItemSearchResults(items: ItemDto[], client: Socket | Server) {
    client.emit('api/searchItem', items);
  }
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