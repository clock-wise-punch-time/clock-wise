import { ApiProperty } from "@nestjs/swagger";
import { BreakDto } from "src/application/ports/dtos/break.dto";

export class PunchClockDto {
  @ApiProperty({
    description: "The punch clock id",
  })
  id: number;

  @ApiProperty({
    description: "The user id",
  })
  userId: string;

  @ApiProperty({
    description: "The date",
  })
  date: Date;

  @ApiProperty({
    description: "The start time",
  })
  startTime: Date;

  @ApiProperty({
    description: "The end time",
  })
  endTime?: Date;

  @ApiProperty({
    description: "The duration",
  })
  duration?: number;

  @ApiProperty({
    description: "The breaks",
    type: BreakDto,
  })
  breaks: BreakDto[];
}
