import { NestFactory, PartialGraphHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { PrismaHelper } from "src/adapters/database/helpers/prisma.helper";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { writeFileSync } from "fs";
import { ConfigService } from "@nestjs/config";
import * as compression from "compression";
import helmet from "helmet";
import * as fs from "fs";
import { config } from "dotenv";
config();

const logger = new Logger(bootstrap.name);

function generateKeys() {
  const publicKeyContent = process.env.PUBLIC_KEY;
  const privateKeyContent = process.env.PRIVATE_KEY;

  const rootDir = process.cwd();
  fs.writeFile(
    `${rootDir}/security/keys/public_key.pem`,
    publicKeyContent,
    () => {},
  );
  fs.writeFile(
    `${rootDir}/security/keys/private_key.pem`,
    privateKeyContent,
    () => {},
  );
}

async function bootstrap() {
  generateKeys();
  process.env.TZ = "UTC";
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
    forceCloseConnections: true,
    abortOnError: false,
  });
  app.enableCors();
  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle("Punch Clock API")
    .setDescription("The punch clock API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.get(PrismaHelper, { strict: false });
  app.enableShutdownHooks();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  const PORT = configService.get("PORT") ?? 3010;
  await app.listen(PORT, () => {
    logger.verbose(`

    //////////////////////////////
    //////////////////////////////
    //////////////////////////////
    //////////%,,,,@,,,,%(////////
    ///////%,,,,,..@..,,,,,%//////
    //////%,,,.... @ ....,,,%/////
    //////%,,,...  %@@@@@@,,%(////
    //////%,,,....# .....,,,%(////
    ///////%,,,,,.....,,,,*%(/////
    /////////(%,,,,,,,,,%#(///////
    /////////////(((((////////////
    //////////////////////////////

            ⌚ CLOCK WISE
            
    ✅ Available at the port ${PORT}
    🚀 Deploy to the ${process.env.NODE_ENV}
    `);
  });
}

bootstrap().catch(err => {
  try {
    writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
  } catch (error) {
    logger.error("Error when trying to write graph.json.");
    logger.error(error);
  }
  logger.error(err);
  process.exit(1);
});
