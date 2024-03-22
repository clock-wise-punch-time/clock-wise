import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EndPunchClockDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsNumber()
  @IsOptional()
  duration?: number;
}
