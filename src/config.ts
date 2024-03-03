import { type CorsOptions } from 'cors';

export type TAppConfig = {
  environment: 'PROD' | 'DEV';
  environmentVariables: string[];
  production: boolean;
  /*
   * `8080` = PROD
   * `8090` = DEV
   */
  port: 8080 | 8090 | number;
  cors: CorsOptions;
  log: {
    apiUrl: string;
    apiKey: string;
  };
};

export const AppConfig: TAppConfig = {
  environment: determineEnvironment(),
  environmentVariables: [
    'ENV',
    'RESEND_API_KEY',
    'BACKEND_HOST',
    'SERVICE_USER_UUID',
    'SERVICE_USER_PASSWORD',
    'LOG_API_URL',
    'LOG_API_KEY',
  ],
  production: determineEnvironment() === 'PROD',
  port:
    process.env.PORT != undefined
      ? Number(process.env.PORT)
      : determineEnvironment() === 'PROD'
      ? 8080
      : 8090,
  cors: {
    origin: determineEnvironment() === 'PROD' ? [/\.budget-buddy\.de$/] : [/\.localhost\$/],
    credentials: false,
  },
  log: {
    apiUrl: process.env.LOG_API_URL as string,
    apiKey: process.env.LOG_API_KEY as string,
  },
};

export function determineEnvironment(): TAppConfig['environment'] {
  const env = process.env.ENV as string | undefined;

  switch (env) {
    case 'PROD':
    case 'prod':
      return 'PROD';

    case 'DEV':
    case 'dev':
    default:
      return 'DEV';
  }
}
