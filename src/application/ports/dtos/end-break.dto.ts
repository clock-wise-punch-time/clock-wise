import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class EndBreakDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}
