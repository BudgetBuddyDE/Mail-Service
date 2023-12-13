import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { AppConfig } from './app.config';
import { ELogCategory, log } from './middleware';
import { Resend } from 'resend';
import WelcomeUser from './emails/welcome-user';

/**
 * Check if all required environment-variables are set
 */
const MISSING_ENVIRONMENT_VARIABLES = AppConfig.environmentVariables.filter((variable) => {
  if (!process.env[variable]) {
    return variable;
  }
});
if (MISSING_ENVIRONMENT_VARIABLES.length >= 1) {
  log(
    'ERROR',
    ELogCategory.SETUP,
    JSON.stringify({
      missing: MISSING_ENVIRONMENT_VARIABLES,
      error: 'server/missing-environment-variables',
    })
  );
  process.exit();
}

export const app = express();

app.use(cors(AppConfig.cors));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/', async (request, response) => {
  console.log(
    await resend.emails.send({
      to: 'thorben.klein1801@gmail.com',
      from: 'no-reply@mail.budget-buddy.de',
      subject: 'Welcome to Budget-Buddy',
      // html: '<strong>Welcome aboard, John Doe!</strong>',
      // @ts-ignore
      react: <WelcomeUser name="Thorben" company="(DEV) Budget-Buddy" />,
    })
  );
  response.status(200).json({});
});

app.get('/verify', async (request, response) => {
  console.log(await resend.domains.verify('47eec7ba-0967-4efb-8a57-705f526f4aec'));
  response.status(200).json({});
});

export const listen = app.listen(AppConfig.port, () => {
  log(
    'INFO',
    ELogCategory.SETUP,
    `Mail-Service is listening on http://localhost:${AppConfig.port}`
  );
});
