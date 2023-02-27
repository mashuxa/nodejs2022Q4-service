import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import { getResponseBody } from './getResponseBody';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    getResponseBody(response, (body) => {
      response.on('finish', () => {
        if (response.statusCode < 400) {
          const log = this.logger.getHttpLog(request, response, body);

          this.logger.log(log);
        }
      });
    });

    next();
  }
}
