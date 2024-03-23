import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class StartBreakDto {
  @IsNumber()
  @IsNotEmpty()
  punchClockId: number;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;
}
