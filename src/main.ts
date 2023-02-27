import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { LoggerService } from './logger/logger.service';
import messages from './constants/messages';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = new LoggerService();
  const handleError = (error: Error) => {
    logger.error(error.message, JSON.stringify(error.stack));
  };

  process.on('uncaughtException', handleError);
  process.on('unhandledRejection', handleError);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
  logger.log(messages.start);
}

bootstrap();
