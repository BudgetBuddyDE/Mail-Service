import dotenv from 'dotenv';
dotenv.config();
import { AppConfig } from '../../src/config';

export const CONFIG = {
  website: 'https://budget-buddy.de',
  webapp: 'https://app.budget-buddy.de',
  authMailVerifyEndpoint: (process.env.BACKEND_HOST as string) + '/v1/auth/verify',
};

export const SERVICE_URL =
  process.env.ENV === 'PROD'
    ? 'http://mail.backend.budget-buddy.de'
    : `http://localhost:${AppConfig.port}`;
