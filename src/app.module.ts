import { HttpModule } from '@nestjs/axios';
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BreakController } from 'src/adapters/controllers/break.controller';
import { PunchClockController } from 'src/adapters/controllers/punch-clock.controller';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { BreakRepository } from 'src/adapters/database/repositories/break.repository';
import { PunchClockRepository } from 'src/adapters/database/repositories/punch-clock.repository';
import { UserMiddleware } from 'src/application/middlewares/user.middleware';
import { BreakService } from 'src/application/services/break.service';
import { PunchClockService } from 'src/application/services/punch-clock.service';
import { EndBreakUseCase } from 'src/application/usecase/end-break/end-break.usecase';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock/end-punch-clock.usecase';
import { GetPunchClockUseCase } from 'src/application/usecase/get-punch-clock/get-punch-clock.usecase';
import { StartBreakUseCase } from 'src/application/usecase/start-break/start-break.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';

@Module({
  imports: [HttpModule],
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
    {
      provide: 'IPunchClockRepositoryPort',
      useClass: PunchClockRepository,
    },
    {
      provide: 'IBreakRepositoryPort',
      useClass: BreakRepository,
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
