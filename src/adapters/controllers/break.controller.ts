import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BreakDto } from "src/application/ports/dtos/break.dto";
import { EndBreakDto } from "src/application/ports/dtos/end-break.dto";
import { StartBreakDto } from "src/application/ports/dtos/start-break.dto";
import { EndBreakUseCase } from "src/application/usecase/end-break/end-break.usecase";
import { StartBreakUseCase } from "src/application/usecase/start-break/start-break.usecase";

@ApiTags("break")
@ApiBasicAuth()
@Controller("v1/break")
export class BreakController {
  constructor(
    private readonly startBreakUseCase: StartBreakUseCase,
    private readonly endBreakUseCase: EndBreakUseCase,
  ) {}

  @Post("start")
  @ApiCreatedResponse({
    description: "The break has been started",
    type: BreakDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async startBreak(@Body() data: StartBreakDto) {
    return this.startBreakUseCase.execute(data);
  }

  @ApiCreatedResponse({
    description: "The break has been ended",
    type: BreakDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @Post("end")
  async endBreak(@Body() data: EndBreakDto) {
    return this.endBreakUseCase.execute(data);
  }
}
