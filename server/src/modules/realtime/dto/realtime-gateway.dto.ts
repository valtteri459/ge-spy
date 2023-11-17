import { ApiProperty } from "@nestjs/swagger";

export class RealtimeItemSearchDto {
  @ApiProperty()
  name: string
}

export class RealTimePriceData {
  @ApiProperty({required: false, nullable: true})
  high?: number
  @ApiProperty({required: false, nullable: true})
  highTime?: number
  @ApiProperty({required: false, nullable: true})
  low?: number
  @ApiProperty({required: false, nullable: true})
  lowTime?: number
}

export class RealTimePriceUpdateDto {
  @ApiProperty()
  data: [number, RealTimePriceData][]
}