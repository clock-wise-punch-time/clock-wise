import { BreaksDto } from 'src/application/ports/dtos/breaks.dto';

export interface PunchClockDto {
  id: number;
  userId: number;
  date: Date;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  breaks: BreaksDto[];
}
