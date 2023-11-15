import { ApiProperty } from "@nestjs/swagger";

export class ItemDto {
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