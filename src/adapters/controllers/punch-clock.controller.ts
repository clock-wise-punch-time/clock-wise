import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { EndPunchClockDto } from "src/application/ports/dtos/end-punch-clock.dto";
import { PunchClockDto } from "src/application/ports/dtos/punch-clock.dto";
import { StartPunchClockDto } from "src/application/ports/dtos/start-punch-clock.dto";
import { EndPunchClockUseCase } from "src/application/usecase/end-punch-clock/end-punch-clock.usecase";
import { GenerateReportUseCase } from "src/application/usecase/generate-report/generate-report.usecase";
import { GetPunchClockUseCase } from "src/application/usecase/get-punch-clock/get-punch-clock.usecase";
import { StartPunchClockUseCase } from "src/application/usecase/start-punch-clock/start-punch-clock.usecase";
import { RequestUser } from "src/core/types/request.types";
@ApiTags("punch-clock")
@ApiBasicAuth()
@Controller("v1/punch-clock")
export class PunchClockController {
  constructor(
    private readonly startPunchClockUseCase: StartPunchClockUseCase,
    private readonly endPunchClockUseCase: EndPunchClockUseCase,
    private readonly getPunchClockUseCase: GetPunchClockUseCase,
    private readonly generateReportUseCase: GenerateReportUseCase,
  ) {}

  @Post("start")
  @ApiCreatedResponse({
    description: "The punch clock has been started",
    type: StartPunchClockDto,
  })
  @ApiBadRequestResponse({
    description: "Validation Error",
  })
  async startPunchClock(@Req() req: RequestUser) {
    const userId = req?.user?.user_id;
    return this.startPunchClockUseCase.execute(String(userId));
  }

  @Post("end/:id")
  @ApiCreatedResponse({
    description: "The punch clock has been ended",
    type: EndPunchClockDto,
  })
  @ApiBadRequestResponse({
    description: "Validation Error",
  })
  @ApiNotFoundResponse({
    description: "Punch clock not found",
  })
  async endPunchClock(@Param("id") id: string) {
    return this.endPunchClockUseCase.execute(Number(id));
  }

  @Get("today")
  @ApiOkResponse({
    description: "The punch clock of the day",
    type: PunchClockDto,
  })
  @ApiBadRequestResponse({
    description: "Validation Error",
  })
  async getPunchClock(@Req() req: RequestUser) {
    const userId = req?.user?.user_id;

    return this.getPunchClockUseCase.execute(userId, new Date());
  }

  @Get("/:date")
  @ApiOkResponse({
    description: "The punch clock of specific day",
    type: PunchClockDto,
  })
  @ApiBadRequestResponse({
    description: "Validation Error",
  })
  async getPunchClockByDate(
    @Req() req: RequestUser,
    @Param("date") date: Date,
  ) {
    if (!date) {
      throw new BadRequestException("Date is required");
    }

    const userId = req?.user?.user_id;

    return this.getPunchClockUseCase.execute(String(userId), date);
  }

  @Post("report")
  @ApiCreatedResponse({
    description: "The punch clock report by a provided user id",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiBadRequestResponse({
    description: "The period between start and end date cannot exceed 30 days",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async getPunchClockReport(
    @Req() req: RequestUser & { email: string },
    @Body() body: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.user_id;
    const email = process.env.SMTP_DEFAULT_EMAIL;

    return this.generateReportUseCase.execute({
      userId: String(userId),
      email,
      initialDate: body.startDate,
      finalDate: body.endDate,
    });
  }
}
