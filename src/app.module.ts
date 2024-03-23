import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BreakController } from 'src/adapters/controllers/break.controller';
import { PunchClockController } from 'src/adapters/controllers/punch-clock.controller';
import { CsvGeneratorService } from 'src/adapters/csv-generator/csv-generator.service';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { BreakRepository } from 'src/adapters/database/repositories/break.repository';
import { PunchClockRepository } from 'src/adapters/database/repositories/punch-clock.repository';
import { EmailSenderService } from 'src/adapters/emails/email-sender.service';
import { UserMiddleware } from 'src/application/middlewares/user.middleware';
import { BreakService } from 'src/application/services/break.service';
import { PunchClockService } from 'src/application/services/punch-clock.service';
import { EndBreakUseCase } from 'src/application/usecase/end-break/end-break.usecase';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock/end-punch-clock.usecase';
import { GenerateReportUseCase } from 'src/application/usecase/generate-report/generate-report.usecase';
import { GetPunchClockUseCase } from 'src/application/usecase/get-punch-clock/get-punch-clock.usecase';
import { StartBreakUseCase } from 'src/application/usecase/start-break/start-break.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: process.env.SMTP_FROM,
      },
    }),
    HttpModule,
  ],
  controllers: [PunchClockController, BreakController],
  providers: [
    PrismaHelper,
    PunchClockService,
    StartPunchClockUseCase,
    EndPunchClockUseCase,
    GetPunchClockUseCase,
    StartBreakUseCase,
    EndBreakUseCase,
    BreakService,
    GenerateReportUseCase,
    {
      provide: 'IPunchClockRepositoryPort',
      useClass: PunchClockRepository,
    },
    {
      provide: 'IBreakRepositoryPort',
      useClass: BreakRepository,
    },
    {
      provide: 'IEmailSenderPort',
      useClass: EmailSenderService,
    },
    {
      provide: 'ICsvGeneratorPort',
      useClass: CsvGeneratorService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(PunchClockController);
  }
}
