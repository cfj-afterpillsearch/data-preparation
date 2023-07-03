import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const csvFilePath = './data/20230625/medicalinstitution-20220808-raw.csv';

  await app.get(AppService).job_postalcode2address(csvFilePath);
  app.close();
}

bootstrap();
