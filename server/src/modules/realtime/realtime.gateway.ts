import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer,  } from '@nestjs/websockets';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';
import { Server, Socket } from 'socket.io';
import { ItemService } from '../item/item.service';
import { isString } from 'class-validator';
import { ItemDto } from '../item/dto/item-response.dto';
import { RealTimePriceUpdateDto, RealTimeItemSearchDto, RealTimeItemRequestDto, RealTimeItemResponseDto, SystemNoticeMessageDto } from './dto/realtime-gateway.dto';
import { UnstablePriceData, UnstablePriceStructure } from '../item-fetcher/types/unstable-prices.types';
import { ItemFetcherService } from '../item-fetcher/item-fetcher.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway{
  constructor(
    private readonly itemService: ItemService
  ){}

  @WebSocketServer()
  server: Server


  /**item search */
  @SubscribeMessage('api/searchItem')
  @AsyncApiPub({
    channel: 'api/searchItem',
    message: {
      payload: RealTimeItemSearchDto,
    },
  })
  async searchItems(
    @ConnectedSocket() client: Socket,
    @MessageBody() searchString: RealTimeItemSearchDto,
  ) {
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

  /**Item information */
  @SubscribeMessage('api/item')
  @AsyncApiPub({
    channel: 'api/item',
    message: {
      payload: RealTimeItemRequestDto,
    },
  })
  async getItem(
    @ConnectedSocket() client: Socket,
    @MessageBody() itemQuery: RealTimeItemRequestDto,
  ) {
    const item = await this.itemService.asyncfindOne(itemQuery.id)
    if(item){
      this.sendItem({
        ...item, 
        icon: "https://secure.runescape.com/m=itemdb_oldschool/obj_sprite.gif?id=" + item.id, 
        icon_large: "https://secure.runescape.com/m=itemdb_oldschool/obj_big.gif?id=" + item.id
      }, client)
    } else {
      this.sendNotice({
        type: 'WARNING',
        message: `Item by id "${itemQuery.id}" not found`
      }, client)
    }
   
  }

  @AsyncApiSub({
    channel: 'api/item',
    message: [{
      payload: RealTimeItemResponseDto,
    }]
  })
  async sendItem(item: RealTimeItemResponseDto, client: Socket | Server) {
    client.emit('api/item', item);
  }

  async sendNotice(message: SystemNoticeMessageDto, recipient: Socket | Server) {
    recipient.emit('api/notice', message)
  } 
}
