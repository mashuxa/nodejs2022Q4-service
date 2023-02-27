import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { appendFile, readdir, stat, writeFile } from 'fs/promises';
import { Request, Response } from 'express';
import { resolve } from 'path';
import { mkdirSync } from 'fs';

const MAX_LOG_SIZE = Number(process.env.MAX_LOG_FILE_SIZE_KB) * 1024;

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();

    const level = Number(process.env.LOG_LEVEL) + 1;
    const logLevels = this.options.logLevels.slice(0, level);

    this.setLogLevels(logLevels);
    this.createLogDirectory();
  }

  createLogDirectory() {
    mkdirSync(resolve('./src/logs/errors'), { recursive: true });
  }

  async createLogFile(directory: string): Promise<string> {
    const fileName = `${Date.now()}.txt`;

    await writeFile(resolve(directory, fileName), '');

    return fileName;
  }

  async getFilesList(directory: string): Promise<string[]> {
    const folderData = await readdir(directory, { withFileTypes: true });
    const filterFiles = (acc, data) =>
      data.isFile() ? [...acc, data.name] : acc;

    const files = folderData.reduce(filterFiles, []);

    return files.length ? files : [await this.createLogFile(directory)];
  }

  async writeLog(message: string, folder = '') {
    const logDirectory = resolve('./src/logs', folder);
    const list = await this.getFilesList(logDirectory);
    const lastLogPath = list[list.length - 1];
    const path = resolve(logDirectory, lastLogPath);
    const lastLogFile = await stat(path);
    const fileName =
      lastLogFile.size > MAX_LOG_SIZE ? `${Date.now()}.txt` : lastLogPath;

    await appendFile(
      resolve(logDirectory, fileName),
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

  getHttpLog(
    request: Request,
    response: Response,
    responseBody: string,
  ): string {
    const requestData = `[REQUEST] url: ${request.originalUrl}, method: ${
      request.method
    }, queryParameters: ${JSON.stringify(
      request.params,
    )}, body: ${JSON.stringify(request.body)}`;
    const responseData = `[RESPONSE] status: ${response.statusCode}, body: ${responseBody}, message: ${response.statusMessage}`;

    return `${requestData} | ${responseData}`;
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
