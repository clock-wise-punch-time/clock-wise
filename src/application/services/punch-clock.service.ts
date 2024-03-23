import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ICsvGenerator } from 'src/application/ports/csv-generator/csv-generator.port';
import { EndPunchClockDto } from 'src/application/ports/dtos/end-punch-clock.dto';
import { IGenerateReportDto } from 'src/application/ports/dtos/generate-report.dto';
import { StartPunchClockDto } from 'src/application/ports/dtos/start-punch-clock.dto';
import { IEmailSender } from 'src/application/ports/emails/email-sender.port';
import { IPunchClockRepositoryPort } from 'src/application/ports/repositories/punch-clock.repository.port';

@Injectable()
export class PunchClockService {
  constructor(
    @Inject('IPunchClockRepositoryPort')
    private readonly punchClockRepository: IPunchClockRepositoryPort,
    @Inject('IEmailSenderPort')
    private readonly emailSender: IEmailSender,
    @Inject('ICsvGeneratorPort')
    private readonly csvGenerator: ICsvGenerator,
  ) {}

  async startPunchClock(validatedData: StartPunchClockDto) {
    const now = new Date();
    const utcNow = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      ),
    );

    const punchClock = await this.punchClockRepository.getPunchClock(
      validatedData.userId,
      utcNow,
    );

    if (punchClock) {
      throw new BadRequestException('Punch clock already started');
    }

    return this.punchClockRepository.startPunchClock(validatedData);
  }

  async endPunchClock(validatedData: EndPunchClockDto) {
    const punchClock = await this.punchClockRepository.findById(
      validatedData.id,
    );

    if (!punchClock) {
      throw new NotFoundException('Punch clock not found');
    }

    if (punchClock.endTime) {
      throw new BadRequestException('Punch clock already ended');
    }

    const hasBreakWithoutEnd = punchClock.breaks.some(
      (breakItem) => !breakItem.endTime,
    );

    if (hasBreakWithoutEnd) {
      throw new BadRequestException('User has break without end');
    }

    const totalBreakDuration = punchClock.breaks.reduce((acc, curr) => {
      return acc + (curr.endTime.getTime() - curr.startTime.getTime());
    }, 0);

    const totalWorkDuration =
      new Date(validatedData.endTime).getTime() -
      punchClock.startTime.getTime();

    const duration = parseFloat(
      ((totalWorkDuration - totalBreakDuration) / (1000 * 60 * 60)).toFixed(2),
    );

    return this.punchClockRepository.endPunchClock({
      ...validatedData,
      duration,
    });
  }

  async getPunchClock(userId: number, date: Date) {
    return this.punchClockRepository.getPunchClock(userId, date);
  }

  async getPunchClockDataForReport({
    userId,
    initialDate,
    finalDate,
    email,
  }: IGenerateReportDto) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    if (initialDate > finalDate) {
      throw new BadRequestException('Initial date is greater than final date');
    }

    if (isNaN(initialDate.getTime()) || isNaN(finalDate.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    const differenceInTime = finalDate.getTime() - initialDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 30) {
      throw new BadRequestException(
        'The period between initial and final date cannot exceed 30 days',
      );
    }

    try {
      const punchClocks =
        await this.punchClockRepository.getPunchClockDataForReport(
          userId,
          initialDate,
          finalDate,
        );

      await this.csvGenerator.generateCsv(punchClocks, 'punch-clocks.csv', [
        { id: 'id', title: 'ID' },
        { id: 'userId', title: 'User ID' },
        { id: 'date', title: 'Date' },
        { id: 'startTime', title: 'Start Time' },
        { id: 'endTime', title: 'End Time' },
        { id: 'breaks', title: 'Breaks' },
        { id: 'duration', title: 'Duration' },
      ]);
      await this.emailSender.sendEmail({
        to: email,
        subject: 'Punch Clock Report',
        filePath: 'punch-clocks.csv',
        content: 'Punch Clock Report',
      });
    } catch (error) {
      throw new InternalServerErrorException('Error generating report');
    }
  }
}
