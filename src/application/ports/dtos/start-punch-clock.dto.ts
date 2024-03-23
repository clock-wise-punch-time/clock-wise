import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class StartPunchClockDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;
}
