import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  print(message: string) {
    const data = `${this.getTimestamp()} | ${message}`;

    console.log(data);
  }

  log(message: string) {
    this.print(this.colorize(message, 'log'));
  }

  error(message: string, stack?: string) {
    const msg = [message, stack].filter((value) => value).join(' | STACK: ');

    this.print(this.colorize(msg, 'error'));
  }

  warn(message: string) {
    this.print(this.colorize(message, 'warn'));
  }

  debug(message: string) {
    this.print(this.colorize(message, 'debug'));
  }

  verbose(message: string) {
    this.print(this.colorize(message, 'verbose'));
  }
}
