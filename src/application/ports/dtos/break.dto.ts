import { ApiProperty } from '@nestjs/swagger';

export class BreakDto {
  @ApiProperty({
    description: 'The break id',
  })
  id: number;

  @ApiProperty({
    description: 'The punch clock id',
  })
  punchClockId?: number;

  @ApiProperty({
    description: 'The start time',
  })
  startTime: Date;

  @ApiProperty({
    description: 'The end time',
  })
  endTime: Date;
}
