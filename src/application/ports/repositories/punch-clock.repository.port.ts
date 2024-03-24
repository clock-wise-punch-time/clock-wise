import { EndPunchClockDto } from "src/application/ports/dtos/end-punch-clock.dto";
import { PunchClockDto } from "src/application/ports/dtos/punch-clock.dto";
import { StartPunchClockDto } from "src/application/ports/dtos/start-punch-clock.dto";

export interface IPunchClockRepositoryPort {
  findById(id: number): Promise<PunchClockDto>;
  startPunchClock(punchClock: StartPunchClockDto): Promise<PunchClockDto>;
  endPunchClock(punchClock: EndPunchClockDto): Promise<PunchClockDto>;
  getPunchClock(userId: number, date: Date): Promise<PunchClockDto>;
  getPunchClockDataForReport(
    userId: number,
    initialDate: Date,
    finalDate: Date,
  ): Promise<PunchClockDto[]>;
}
