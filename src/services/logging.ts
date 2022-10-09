import winston from 'winston';
import { env } from '@utils/environment';

interface LogFn {
  /* tslint:disable:no-unnecessary-generics */
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;
  (obj: unknown, msg?: string, ...args: any[]): void;
  (msg: string, ...args: any[]): void;
}

export interface ILogger {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  http: LogFn;
  verbose: LogFn;
  debug: LogFn;
  silly: LogFn;
}

export const Logger: ILogger = winston.createLogger({
  level: env.isDevelopment ? 'debug' : 'warn',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});
