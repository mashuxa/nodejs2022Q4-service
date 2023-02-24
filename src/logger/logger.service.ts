import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile, mkdir, readdir, stat, writeFile } from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  async writeLog(message: string, folder = '') {
    const logDirectory = `./src/logs/${folder}`;
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

  log(message: string) {
    this.print(this.colorize(message, 'log'));
    void this.writeLog(message);
  }

  error(message: string, stack?: string) {
    const msg = [message, stack].filter((value) => value).join(' | STACK: ');

    this.print(this.colorize(msg, 'error'));
    void this.writeLog(msg, 'errors');
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
