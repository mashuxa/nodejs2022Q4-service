import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      if (response.statusCode < 400) {
        this.logger.log(this.logger.getHttpLog(request, response));
      }
    });

    next();
  }
}
