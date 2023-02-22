import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const requestData = `REQUEST url: ${request.originalUrl}, method: ${
        request.method
      }, queryParameters: ${JSON.stringify(
        request.params,
      )}, body: ${JSON.stringify(request.body)}`;
      const responseStatus = `RESPONSE status: ${response.statusCode}, message: ${response.statusMessage}`;

      this.logger.log(requestData);
      this.logger.log(responseStatus);
    });

    next();
  }
}
