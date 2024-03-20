import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { PunchClockDto } from 'src/application/ports/dtos/punch-clock.dto';
import { PunchClockService } from 'src/application/services/punch-clock.service';

@Injectable()
export class EndPunchClockUseCase {
  constructor(private readonly punchClockService: PunchClockService) {}

  async execute(id: number): Promise<PunchClockDto> {
    const inputData = {
      id,
      endTime: new Date(),
    };

    const validatedData = plainToClass(EndPunchClockDto, inputData);
    const errors = await validate(validatedData);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.punchClockService.endPunchClock(validatedData);
  }
}
