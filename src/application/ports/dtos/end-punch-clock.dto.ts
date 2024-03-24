import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EndPunchClockDto {
  @ApiProperty({
    description: 'The punch clock id',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'The end time',
  })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({
    description: 'The duration',
  })
  @IsNumber()
  @IsOptional()
  duration?: number;
}
