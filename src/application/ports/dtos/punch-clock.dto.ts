import { BreakDto } from 'src/application/ports/dtos/break.dto';

export interface PunchClockDto {
  id: number;
  userId: number;
  date: Date;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  breaks: BreakDto[];
}
