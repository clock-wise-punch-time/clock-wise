import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class EndBreakDto {
  @ApiProperty({
    description: "The id of the break",
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: "The end time of the break",
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}
