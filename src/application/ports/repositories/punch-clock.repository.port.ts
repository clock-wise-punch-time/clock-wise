import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { PunchClockDto } from 'src/application/ports/dtos/punch-clock.dto';
import { StartPunchClockDto } from 'src/application/ports/dtos/start-punch-clock.dto';

export interface IPunchClockRepositoryPort {
  startPunchClock(punchClock: StartPunchClockDto): Promise<PunchClockDto>;
  endPunchClock(punchClock: EndPunchClockDto): Promise<PunchClockDto>;
}
