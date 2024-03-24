import { BadRequestException, Injectable } from "@nestjs/common";
import { PunchClockDto } from "src/application/ports/dtos/punch-clock.dto";
import { PunchClockService } from "src/application/services/punch-clock.service";

@Injectable()
export class GetPunchClockUseCase {
  constructor(private readonly punchClockService: PunchClockService) {}

  async execute(userId: number, date: Date): Promise<PunchClockDto> {
    const dateReceived = new Date(date);
    const dateUtc = new Date(
      Date.UTC(
        dateReceived.getUTCFullYear(),
        dateReceived.getUTCMonth(),
        dateReceived.getUTCDate(),
      ),
    );

    dateUtc.setUTCHours(0, 0, 0, 0);

    if (isNaN(dateUtc.getTime())) {
      throw new BadRequestException("Invalid date");
    }

    if (dateUtc > new Date()) {
      throw new BadRequestException("Date cannot be greater than today");
    }

    return this.punchClockService.getPunchClock(userId, dateUtc);
  }
}
