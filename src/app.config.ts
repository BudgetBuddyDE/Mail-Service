import { type CorsOptions } from 'cors';

export type TAppConfig = {
  environment: 'PROD' | 'TEST' | 'DEV';
  environmentVariables: string[];
  production: boolean;
  /*
   * `8080` = PROD, DEV
   * `8090` = TEST ONLY
   */
  port: 8080 | 8090;
  cors: CorsOptions;
};

export const AppConfig: TAppConfig = {
  environment: determineEnvironment(),
  environmentVariables: ['ENV', 'RESEND_API_KEY'],
  production: determineEnvironment() === 'PROD',
  port: determineEnvironment() === 'TEST' ? 8090 : 8080,
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

    case 'TEST':
    case 'test':
      return 'TEST';

    case 'DEV':
    case 'dev':
    default:
      return 'DEV';
  }
}
