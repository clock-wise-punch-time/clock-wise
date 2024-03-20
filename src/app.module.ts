import { HttpModule } from '@nestjs/axios';
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PunchClockController } from 'src/adapters/controllers/punch-clock.controller';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { PunchClockRepository } from 'src/adapters/database/repositories/punch-clock.repository';
import { UserMiddleware } from 'src/application/middlewares/user.middleware';
import { PunchClockService } from 'src/application/services/punch-clock.service';
import { EndPunchClockUseCase } from 'src/application/usecase/end-punch-clock.usercase.ts/end-punch-clock.usecase';
import { StartPunchClockUseCase } from 'src/application/usecase/start-punch-clock/start-punch-clock.usecase';

@Module({
  imports: [HttpModule],
  controllers: [PunchClockController],
  providers: [
    PrismaHelper,
    PunchClockService,
    StartPunchClockUseCase,
    EndPunchClockUseCase,
    {
      provide: 'IPunchClockRepositoryPort',
      useClass: PunchClockRepository,
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
