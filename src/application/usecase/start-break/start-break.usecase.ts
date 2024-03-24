import { Injectable } from "@nestjs/common";
import { StartBreakDto } from "src/application/ports/dtos/start-break.dto";
import { BreakService } from "src/application/services/break.service";

@Injectable()
export class StartBreakUseCase {
  constructor(private readonly breakService: BreakService) {}

  async execute(data: StartBreakDto) {
    return this.breakService.startBreak(data);
  }
}
