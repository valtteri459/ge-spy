import { ApiProperty } from "@nestjs/swagger";
import { RealTimeItemRequest, RealTimeItemResponse, RealTimeItemSearch, RealTimePriceData, RealTimePriceUpdate, SystemNoticeMessage } from '../../../../../shared/dto/interfaces'

export class RealTimeItemSearchDto implements RealTimeItemSearch {
  @ApiProperty()
  name: string
}

export class RealTimePriceDataDto implements RealTimePriceData {
  @ApiProperty({required: false, nullable: true})
  high?: number
  @ApiProperty({required: false, nullable: true})
  highTime?: number
  @ApiProperty({required: false, nullable: true})
  low?: number
  @ApiProperty({required: false, nullable: true})
  lowTime?: number
}

export class RealTimePriceUpdateDto implements RealTimePriceUpdate {
  @ApiProperty()
  data: [number, RealTimePriceData][]
}

export class RealTimeItemRequestDto implements RealTimeItemRequest {
  @ApiProperty()
  id: number
}

export class RealTimeItemResponseDto implements RealTimeItemResponse {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty({required: false, nullable: true})
  purchaseLimit: number | null

  @ApiProperty({required: false, nullable: true})
  lowAlchemy: number | null

  @ApiProperty({required: false, nullable: true})
  highAlchemy: number | null

  @ApiProperty({required: false, nullable: true})
  shopPrice: number | null

  @ApiProperty()
  members: boolean

  @ApiProperty()
  icon: string

  @ApiProperty()
  icon_large: string
}

export class SystemNoticeMessageDto implements SystemNoticeMessage {
  @ApiProperty({
    enum: ['INFO', 'WARNING', 'ERROR'],
    type: String
  })
  type: 'INFO'| 'WARNING' | 'ERROR'
  @ApiProperty()
  message: string
}