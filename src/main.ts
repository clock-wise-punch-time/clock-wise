import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  app.get(PrismaHelper, { strict: false });

  await app.listen(process.env.PORT || 3010);
}

bootstrap();
