import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

import { Command } from 'commander';
const program = new Command();

program.option('--csvFilePath <filePath>', 'CSVファイル', '');
program.parse();

const options = program.opts();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.get(AppService).job_address2latlng(options.csvFilePath);
  app.close();
}

bootstrap();
