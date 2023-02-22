import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(props) {
    super(props);
  }

  log(message: string) {
    const data = `${this.getTimestamp()} | ${message}`;

    console.log(data);
  }
}
