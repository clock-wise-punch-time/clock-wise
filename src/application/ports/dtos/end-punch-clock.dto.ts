import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class EndPunchClockDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}
