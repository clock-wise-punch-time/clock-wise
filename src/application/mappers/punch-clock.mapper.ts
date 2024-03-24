import { Break, PunchClock } from "@prisma/client";
import { PunchClockDto } from "src/application/ports/dtos/punch-clock.dto";

export class PunchClockMapper {
  static toResponse(
    punchClock: PunchClock & { breaks: Break[] },
  ): PunchClockDto {
    return {
      id: punchClock.id,
      date: punchClock.date,
      userId: punchClock.userId,
      startTime: punchClock.startTime,
      endTime: punchClock.endTime,
      breaks: punchClock.breaks,
    };
  }
}
