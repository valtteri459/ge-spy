import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, Min, Validate } from "class-validator";

export class priceRequestDto{
  @ApiProperty()
  @IsInt()
  @Min(140000)
  start: number
  @ApiProperty()
  @IsInt()
  @Min(140000)
  end: number
  @ApiProperty()
  @IsInt()
  id: number
}