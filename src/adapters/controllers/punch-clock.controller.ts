import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { PunchClockDto } from 'src/application/ports/dtos/punch-clock.dto';
import { StartPunchClockDto } from 'src/application/ports/dtos/start-punch-clock.dto';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock/end-punch-clock.usecase';
import { GenerateReportUseCase } from 'src/application/usecase/generate-report/generate-report.usecase';
import { GetPunchClockUseCase } from 'src/application/usecase/get-punch-clock/get-punch-clock.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';
@ApiTags('punch-clock')
@ApiBasicAuth()
@Controller('v1/punch-clock')
export class PunchClockController {
  constructor(
    private readonly startPunchClockUseCase: StartPunchClockUseCase,
    private readonly endPunchClockUseCase: EndPunchClockUseCase,
    private readonly getPunchClockUseCase: GetPunchClockUseCase,
    private readonly generateReportUseCase: GenerateReportUseCase,
  ) {}

  @Post('start')
  @ApiCreatedResponse({
    description: 'The punch clock has been started',
    type: StartPunchClockDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
  })
  async startPunchClock(@Req() req: Request & { userId: string }) {
    const userId = req.userId;
    return this.startPunchClockUseCase.execute(Number(userId));
  }

  @Post('end/:id')
  @ApiCreatedResponse({
    description: 'The punch clock has been ended',
    type: EndPunchClockDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
  })
  @ApiNotFoundResponse({
    description: 'Punch clock not found',
  })
  async endPunchClock(@Param('id') id: string) {
    return this.endPunchClockUseCase.execute(Number(id));
  }

  @Get('today')
  @ApiOkResponse({
    description: 'The punch clock of the day',
    type: PunchClockDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
  })
  async getPunchClock(@Req() req: Request & { userId: string }) {
    const userId = req.userId;

    return this.getPunchClockUseCase.execute(Number(userId), new Date());
  }

  @Get('/:date')
  @ApiOkResponse({
    description: 'The punch clock of specific day',
    type: PunchClockDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
  })
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

  @Post('report')
  @ApiCreatedResponse({
    description: 'The punch clock report by a provided user id',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiBadRequestResponse({
    description: 'The period between start and end date cannot exceed 30 days',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getPunchClockReport(
    @Req() req: Request & { userId: string; email: string },
    @Body() body: { startDate: Date; endDate: Date },
  ) {
    const userId = req.userId;
    const email = req.email;

    return this.generateReportUseCase.execute({
      userId: Number(userId),
      email,
      initialDate: body.startDate,
      finalDate: body.endDate,
    });
  }
}
