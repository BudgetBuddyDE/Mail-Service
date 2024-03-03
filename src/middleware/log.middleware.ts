import { type NextFunction, type Request, type Response } from 'express';
import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';
import { AppConfig } from '../config';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
  defaultMeta: {
    environment: AppConfig.environment.toString(),
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    ...(AppConfig.environment === 'PROD' &&
    AppConfig.log.apiUrl.length > 0 &&
    AppConfig.log.apiKey.length > 0
      ? [
          new SeqTransport({
            serverUrl: AppConfig.log.apiUrl,
            apiKey: AppConfig.log.apiKey,
            onError: (e) => console.error(e),
            handleExceptions: true,
            handleRejections: true,
          }),
        ]
      : []),
  ],
});

export enum ELogCategory {
  SETUP = 'setup',
  MAIL = 'mail',
  REQUEST = 'request',
}

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path.includes('favicon') || req.path === '/status') return next();
  res.on('finish', async () => {
    const statusCode = res.statusCode;
    const message = {
      method: req.method,
      ip: req.ip,
      location: req.originalUrl,
      body: req.body,
      query: req.query,
      headers: req.headers,
    };

    // eslint-disable-next-line
    logger.info("Process request with status code '{statusCode}'", {
      statusCode: statusCode,
      category: ELogCategory.REQUEST,
      ...message,
    });
  });
  next();
}
