import { PrismaHelper } from "src/adapters/database/helpers/prisma.helper";
import { BreakMapper } from "src/application/mappers/break.mapper";
import { BreakDto } from "src/application/ports/dtos/break.dto";
import { EndBreakDto } from "src/application/ports/dtos/end-break.dto";
import { StartBreakDto } from "src/application/ports/dtos/start-break.dto";
import { IBreakRepositoryPort } from "src/application/ports/repositories/break.repository.port";

export class BreakRepository implements IBreakRepositoryPort {
  constructor(private readonly prismaHelper: PrismaHelper) {}

  async findById(id: number): Promise<BreakDto> {
    const data = await this.prismaHelper.break.findUnique({
      where: { id },
    });

    if (!data) {
      return null;
    }

    return BreakMapper.toResponse(data);
  }

  async startBreak(startData: StartBreakDto): Promise<BreakDto> {
    const data = await this.prismaHelper.break.create({
      data: {
        startTime: startData.startTime,
        punchClockId: startData.punchClockId,
      },
    });

    return BreakMapper.toResponse(data);
  }

  async endBreak(endData: EndBreakDto): Promise<BreakDto> {
    const data = await this.prismaHelper.break.update({
      where: { id: endData.id },
      data: {
        endTime: endData.endTime,
      },
    });

    return BreakMapper.toResponse(data);
  }

  async getBreak(id: number, date: Date): Promise<BreakDto> {
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const data = await this.prismaHelper.break.findFirst({
      where: {
        startTime: {
          gte: startDate,
          lt: endDate,
        },
        id,
      },
    });

    if (!data) {
      return null;
    }

    return BreakMapper.toResponse(data);
  }
}
