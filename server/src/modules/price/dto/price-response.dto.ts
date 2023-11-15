import { ApiProperty } from "@nestjs/swagger";

export class PriceUnitDto {
  @ApiProperty()
  timestamp: number
  @ApiProperty()
  itemId: number
  @ApiProperty({nullable: true, required: false})
  highPrice: number | null
  @ApiProperty({nullable: true, required: false})
  lowPrice: number | null
  @ApiProperty({nullable: true, required: false})
  highVolume: number | null
  @ApiProperty({nullable: true, required: false})
  lowVolume: number | null
}

export class PriceDto {
  @ApiProperty({
    type: PriceUnitDto,
    isArray: true
  })
  data: PriceUnitDto[]

  @ApiProperty()
  startTime: number
  @ApiProperty()
  endTime: number
}