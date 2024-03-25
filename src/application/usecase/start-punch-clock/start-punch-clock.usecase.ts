import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { PunchClockDto } from "src/application/ports/dtos/punch-clock.dto";
import { StartPunchClockDto } from "src/application/ports/dtos/start-punch-clock.dto";
import { PunchClockService } from "src/application/services/punch-clock.service";

@Injectable()
export class StartPunchClockUseCase {
  constructor(private readonly punchClockService: PunchClockService) {}

  async execute(userId: string): Promise<PunchClockDto> {
    const inputData = {
      userId,
      date: new Date(),
      startTime: new Date(),
    };

    const validatedData = plainToClass(StartPunchClockDto, inputData);
    const errors = await validate(validatedData);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.punchClockService.startPunchClock(validatedData);
  }
}
