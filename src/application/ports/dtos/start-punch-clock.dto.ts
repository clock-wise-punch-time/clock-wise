import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class StartPunchClockDto {
  @ApiProperty({
    description: "The user id",
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "The date",
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: "The start time",
  })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;
}
