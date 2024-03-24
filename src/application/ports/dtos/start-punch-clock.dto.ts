import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class StartPunchClockDto {
  @ApiProperty({
    description: 'The user id',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'The date',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'The start time',
  })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;
}
