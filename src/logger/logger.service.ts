import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { appendFile, mkdir, readdir, stat, writeFile } from 'fs/promises';
import { Request, Response } from 'express';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();

    const level = Number(process.env.LOG_LEVEL) + 1;
    const logLevels = this.options.logLevels.slice(0, level);

    this.setLogLevels(logLevels);
  }

  async writeLog(message: string, folder = '') {
    const logDirectory = ['./src/logs', folder]
      .filter((value) => value)
      .join('/');
    const files = await readdir(logDirectory).catch(async () => {
      const fileName = `${Date.now()}.txt`;
      await mkdir(logDirectory);
      await writeFile(`${logDirectory}/${fileName}`, '', {});

      return [fileName];
    });
    const lastLogPath = files.pop();
    const lastLogFile = await stat(`${logDirectory}/${lastLogPath}`);
    const fileName =
      lastLogFile.size > Number(process.env.MAX_LOG_FILE_SIZE_KB) * 1024
        ? `${Date.now()}.txt`
        : lastLogPath;

    await appendFile(
      `${logDirectory}/${fileName}`,
      `${this.getTimestamp()} | ${message}\n`,
    );
  }

  print(message: string) {
    const data = `${this.getTimestamp()} | ${message}`;

    console.log(data);
  }

  isLevelEnabled(level: LogLevel): boolean {
    return this.options.logLevels.includes(level);
  }

  getHttpLog(request: Request, response: Response): string {
    const requestData = `[REQUEST] url: ${request.originalUrl}, method: ${
      request.method
    }, queryParameters: ${JSON.stringify(
      request.params,
    )}, body: ${JSON.stringify(request.body)}`;
    const responseStatus = `[RESPONSE] status: ${response.statusCode}, message: ${response.statusMessage}`;

    return `${responseStatus} | ${requestData}`;
  }

  log(message: string) {
    if (this.isLevelEnabled('log')) {
      this.print(this.colorize(message, 'log'));
      void this.writeLog(message);
    }
  }

  error(message: string, stack?: string) {
    if (this.isLevelEnabled('error')) {
      const msg = [message, stack].filter((value) => value).join(' | STACK: ');

      this.print(this.colorize(msg, 'error'));
      void this.writeLog(msg, 'errors');
    }
  }

  warn(message: string) {
    if (this.isLevelEnabled('warn')) {
      this.print(this.colorize(message, 'warn'));
    }
  }

  debug(message: string) {
    if (this.isLevelEnabled('debug')) {
      this.print(this.colorize(message, 'debug'));
    }
  }

  verbose(message: string) {
    if (this.isLevelEnabled('verbose')) {
      this.print(this.colorize(message, 'verbose'));
    }
  }
}
