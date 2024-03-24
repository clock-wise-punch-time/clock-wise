import { Injectable } from '@nestjs/common';
import { EndBreakDto } from 'src/application/ports/dtos/end-break.dto';
import { BreakService } from 'src/application/services/break.service';
import { PunchClockService } from 'src/application/services/punch-clock.service';

@Injectable()
export class EndBreakUseCase {
  constructor(
    private readonly breakService: BreakService,
    private readonly punchClockService: PunchClockService,
  ) {}

  async execute(data: EndBreakDto) {
    return this.breakService.endBreak(data);
  }
}
