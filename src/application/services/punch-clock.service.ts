import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const now = new Date();
    const utcNow = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      ),
    );

    const punchClock = await this.punchClockRepository.getPunchClock(
      validatedData.userId,
      utcNow,
    );

    if (punchClock) {
      throw new BadRequestException('Punch clock already started');
    }

    return this.punchClockRepository.startPunchClock(validatedData);
  }

  async endPunchClock(validatedData: EndPunchClockDto) {
    const punchClock = await this.punchClockRepository.findById(
      validatedData.id,
    );

    if (!punchClock) {
      throw new NotFoundException('Punch clock not found');
    }

    if (punchClock.endTime) {
      throw new BadRequestException('Punch clock already ended');
    }

    const hasBreakWithoutEnd = punchClock.breaks.some(
      (breakItem) => !breakItem.endTime,
    );

    if (hasBreakWithoutEnd) {
      throw new BadRequestException('User has break without end');
    }

    const totalBreakDuration = punchClock.breaks.reduce((acc, curr) => {
      return acc + (curr.endTime.getTime() - curr.startTime.getTime());
    }, 0);

    const totalWorkDuration =
      new Date(validatedData.endTime).getTime() -
      punchClock.startTime.getTime();

    const duration =
      (totalWorkDuration - totalBreakDuration) / (1000 * 60 * 60);

    console.log(duration);

    return this.punchClockRepository.endPunchClock({
      ...validatedData,
      duration,
    });
  }

  async getPunchClock(userId: number, date: Date) {
    return this.punchClockRepository.getPunchClock(userId, date);
  }
}
