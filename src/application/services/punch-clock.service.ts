import { Inject, Injectable } from '@nestjs/common';
import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { StartPunchClockDto } from 'src/application/ports/dtos/start-punch-clock.dto';
import { IPunchClockRepositoryPort } from 'src/application/ports/repositories/punch-clock.repository.port';

@Injectable()
export class PunchClockService {
  constructor(
    @Inject('IPunchClockRepositoryPort')
    private readonly punchClockRepository: IPunchClockRepositoryPort,
  ) {}

  async startPunchClock(validatedData: StartPunchClockDto) {
    return this.punchClockRepository.startPunchClock(validatedData);
  }

  async endPunchClock(validatedData: EndPunchClockDto) {
    return this.punchClockRepository.endPunchClock(validatedData);
  }
}
