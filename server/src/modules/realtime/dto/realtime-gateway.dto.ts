import { ApiProperty } from "@nestjs/swagger";
import { RealTimePriceData, RealTimePriceUpdate } from '../../../shared/interfaces'

export class RealTimeItemSearchDto {
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