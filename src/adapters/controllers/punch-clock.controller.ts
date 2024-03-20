import { Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock.usercase.ts/end-punch-clock.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';

@Controller('v1/punch-clock')
export class PunchClockController {
  constructor(
    private readonly startPunchClockUseCase: StartPunchClockUseCase,
    private readonly endPunchClockUseCase: EndPunchClockUseCase,
  ) {}

  @Post('start')
  async startPunchClock(@Req() req: Request & { userId: string }) {
    const userId = req.userId;
    return this.startPunchClockUseCase.execute(Number(userId));
  }

  @Post('end/:id')
  async endPunchClock(@Param('id') id: number) {
    return this.endPunchClockUseCase.execute(id);
  }
}
