import { type CorsOptions } from 'cors';

export type TAppConfig = {
  environment: 'PROD' | 'DEV';
  environmentVariables: string[];
  production: boolean;
  /*
   * `8090` = PROD
   * `8090` = DEV
   */
  port: 8090 | 8090;
  cors: CorsOptions;
};

export const AppConfig: TAppConfig = {
  environment: determineEnvironment(),
  environmentVariables: [
    'ENV',
    'RESEND_API_KEY',
    'BACKEND_HOST',
    'SERVICE_USER_UUID',
    'SERVICE_USER_PASSWORD',
  ],
  production: determineEnvironment() === 'PROD',
  port: determineEnvironment() === 'PROD' ? 8090 : 8090,
  cors: {
    origin: determineEnvironment() === 'PROD' ? [/\.budget-buddy\.de$/] : [/\.localhost\$/],
    credentials: false,
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
