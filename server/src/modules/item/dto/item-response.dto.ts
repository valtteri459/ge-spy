import { ApiProperty } from "@nestjs/swagger";

export class ItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  type: string
  @ApiProperty()
  icon: string
  @ApiProperty()
  icon_large: string
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty()
  members: boolean
}