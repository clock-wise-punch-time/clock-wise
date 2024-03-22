import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock.usercase.ts/end-punch-clock.usecase';
import { GetPunchClockUseCase } from 'src/application/usecase/get-punch-clock/get-punch-clock.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';

@Controller('v1/punch-clock')
export class PunchClockController {
  constructor(
    private readonly startPunchClockUseCase: StartPunchClockUseCase,
    private readonly endPunchClockUseCase: EndPunchClockUseCase,
    private readonly getPunchClockUseCase: GetPunchClockUseCase,
  ) {}

  @Post('start')
  async startPunchClock(@Req() req: Request & { userId: string }) {
    const userId = req.userId;
    return this.startPunchClockUseCase.execute(Number(userId));
  }

  @Post('end/:id')
  async endPunchClock(@Param('id') id: string) {
    return this.endPunchClockUseCase.execute(Number(id));
  }

  @Get('today')
  async getPunchClock(@Req() req: Request & { userId: string }) {
    const userId = req.userId;

    return this.getPunchClockUseCase.execute(Number(userId), new Date());
  }

  @Get('/:date')
  async getPunchClockByDate(
    @Req() req: Request & { userId: string },
    @Param('date') date: Date,
  ) {
    if (!date) {
      throw new BadRequestException('Date is required');
    }

    const userId = req.userId;

    return this.getPunchClockUseCase.execute(Number(userId), date);
  }
}
