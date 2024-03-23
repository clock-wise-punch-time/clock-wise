import { Body, Controller, Post } from '@nestjs/common';
import { EndBreakDto } from 'src/application/ports/dtos/end-break.dto';
import { StartBreakDto } from 'src/application/ports/dtos/start-break.dto';
import { EndBreakUseCase } from 'src/application/usecase/end-break/end-break.usecase';
import { StartBreakUseCase } from 'src/application/usecase/start-break/start-break.usecase';

@Controller('v1/break')
export class BreakController {
  constructor(
    private readonly startBreakUseCase: StartBreakUseCase,
    private readonly endBreakUseCase: EndBreakUseCase,
  ) {}

  @Post('start')
  async startBreak(@Body() data: StartBreakDto) {
    return this.startBreakUseCase.execute(data);
  }

  @Post('end')
  async endBreak(@Body() data: EndBreakDto) {
    return this.endBreakUseCase.execute(data);
  }
}
