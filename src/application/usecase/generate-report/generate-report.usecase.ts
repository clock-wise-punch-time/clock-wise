import { Injectable } from "@nestjs/common";
import { IGenerateReportDto } from "src/application/ports/dtos/generate-report.dto";
import { PunchClockService } from "src/application/services/punch-clock.service";

@Injectable()
export class GenerateReportUseCase {
  constructor(private readonly punchClockService: PunchClockService) {}

  async execute({ userId, email, initialDate, finalDate }: IGenerateReportDto) {
    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    const initialUtc = new Date(
      Date.UTC(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        initialDate.getDate(),
        initialDate.getHours(),
        initialDate.getMinutes(),
        initialDate.getSeconds(),
      ),
    );
    const finalUtc = new Date(
      Date.UTC(
        finalDate.getFullYear(),
        finalDate.getMonth(),
        finalDate.getDate(),
        finalDate.getHours(),
        finalDate.getMinutes(),
        finalDate.getSeconds(),
      ),
    );

    return this.punchClockService.getPunchClockDataForReport({
      userId,
      email,
      initialDate: initialUtc,
      finalDate: finalUtc,
    });
  }
}
