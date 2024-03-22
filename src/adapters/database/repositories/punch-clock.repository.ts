import { Injectable } from '@nestjs/common';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { PunchClockMapper } from 'src/application/mappers/punch-clock.mapper';
import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { PunchClockDto } from 'src/application/ports/dtos/punch-clock.dto';
import { StartPunchClockDto } from 'src/application/ports/dtos/start-punch-clock.dto';
import { IPunchClockRepositoryPort } from 'src/application/ports/repositories/punch-clock.repository.port';

@Injectable()
export class PunchClockRepository implements IPunchClockRepositoryPort {
  constructor(private readonly prismaHelper: PrismaHelper) {}

  async getPunchClock(userId: number, date: Date): Promise<PunchClockDto> {
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const data = await this.prismaHelper.punchClock.findFirst({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
        userId,
      },
      include: {
        breaks: true,
      },
    });

    if (!data) {
      return null;
    }

    return PunchClockMapper.toResponse(data);
  }

  async findById(id: number): Promise<PunchClockDto> {
    const data = await this.prismaHelper.punchClock.findUnique({
      where: {
        id,
      },
      include: {
        breaks: true,
      },
    });

    if (!data) {
      return null;
    }

    return PunchClockMapper.toResponse(data);
  }

  async startPunchClock(
    punchClock: StartPunchClockDto,
  ): Promise<PunchClockDto> {
    const data = await this.prismaHelper.punchClock.create({
      data: {
        startTime: punchClock.startTime,
        userId: punchClock.userId,
      },
      include: {
        breaks: true,
      },
    });

    return PunchClockMapper.toResponse(data);
  }

  async endPunchClock(punchClock: EndPunchClockDto): Promise<PunchClockDto> {
    const data = await this.prismaHelper.punchClock.update({
      where: {
        id: punchClock.id,
      },
      data: {
        endTime: punchClock.endTime,
      },
      include: {
        breaks: true,
      },
    });

    return PunchClockMapper.toResponse(data);
  }
}
