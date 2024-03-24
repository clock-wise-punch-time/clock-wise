import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class StartBreakDto {
  @ApiProperty({
    description: "The id of the punch clock",
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  punchClockId: number;

  @ApiProperty({
    description: "The start time of the break",
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;
}
