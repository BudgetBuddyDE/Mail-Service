import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces';
import { WelcomeMail } from '../transactional/emails/welcome';
import { resend } from './lib/resend';
import { ELogCategory, log, logMiddleware } from './middleware';
import { AppConfig, determineEnvironment } from './config';
import { UserService } from './services';
import {
  EMailTemplates,
  ZPasswordChangedPayload,
  ZResetPasswordPayload,
  ZWelcomeMailPayload,
} from './types/Mail.type';
import PasswordChanged from '../transactional/emails/password-changed';
import RequestPasswordChange from '../transactional/emails/request-password-change';

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
app.use(logMiddleware);
app.use(bodyParser.json());
app.use(
  '/static',
  express.static(
    path.join(__dirname, '../', determineEnvironment() === 'PROD' ? '../public/' : 'public/')
  )
);

app.get('/status', (req, res) => {
  return res.status(200).json({ status: 'OK' });
});

export const ZBasePayload = z.object({
  to: z.string().email(),
  mail: z.nativeEnum(EMailTemplates),
});
export type TBasePayload = z.infer<typeof ZBasePayload>;

export const ZCombinedPayload = z
  .object({
    ...ZBasePayload.shape,
  })
  .and(z.union([ZWelcomeMailPayload, ZResetPasswordPayload, ZPasswordChangedPayload]));
export type TCombinedPayload = z.infer<typeof ZCombinedPayload>;

app.post('/send', async (req: Request, res: Response) => {
  const reqBody = req.body;
  try {
    if (!reqBody) {
      throw new Error('No body provided');
    }
    const parsedBody = ZCombinedPayload.safeParse(reqBody);
    if (!parsedBody.success) {
      log('ERROR', ELogCategory.MAIL, parsedBody.error.message);
      throw new Error('Body doesn\'t match schema');
    }
    const selectedTemplateType: EMailTemplates = parsedBody.data.mail;
    const selectedTemplate = await getMailTemplate(parsedBody.data);
    if (selectedTemplate === null) {
      throw new Error('Template not found');
    }

    const emailData = {
      from:
        AppConfig.environment === 'PROD' ? 'no_reply@mail.budget-buddy.de' : 'delivered@resend.dev',
      to: parsedBody.data.to,
      subject: getSubject(selectedTemplateType),
      react: selectedTemplate,
    } as CreateEmailOptions;

    const data = await resend.emails.send(emailData);
    return res.status(200).json({ data: data.id });
  } catch (error) {
    const msg = (error instanceof Error ? error.message : error) as string;
    log('ERROR', ELogCategory.MAIL, msg);
    return res.status(500).json({ error: msg });
  }
});

export const listen = app.listen(AppConfig.port, () => {
  log(
    'INFO',
    ELogCategory.SETUP,
    `Mail-Service is listening on http://localhost:${AppConfig.port}`
  );
});

/**
 * Returns the subject line for a given email template.
 *
 * @param mail - The email template.
 * @returns The subject line for the email template.
 */
function getSubject(mail: EMailTemplates): string {
  switch (mail) {
    case 'welcome':
      return 'Welcome to Budget Buddy';

    case 'reset_password':
      return 'You requested to change your password';

    case 'password_changed':
      return 'Your password has been changed';

    default:
      return 'unknown subject';
  }
}

/**
 * Retrieves the mail template based on the provided payload.
 *
 * @param payload - The payload containing the necessary information for generating the mail template.
 * @returns A Promise that resolves to the generated React node representing the mail template, or null if no template is found.
 * @throws An error if there is an issue retrieving user details or generating the mail template.
 */
async function getMailTemplate(payload: TCombinedPayload): Promise<React.ReactNode | null> {
  const company = 'Budget Buddy';
  switch (payload.mail) {
    case 'welcome':
      const [user, error] = await UserService.getDetails(payload.uuid, {
        uuid: process.env.SERVICE_USER_UUID!,
        password: process.env.SERVICE_USER_PASSWORD!,
      });
      if (error) throw error;
      if (!user) throw Error('Could not retrieve user details');

      return WelcomeMail({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        company,
      });

    case 'reset_password':
      const [user1, error1] = await UserService.getDetails(payload.uuid, {
        uuid: process.env.SERVICE_USER_UUID!,
        password: process.env.SERVICE_USER_PASSWORD!,
      });
      if (error1) throw error1;
      if (!user1) throw Error('Could not retrieve user details');

      return RequestPasswordChange({
        name: user1.name,
        otp: payload.otp,
        company,
      });

    case 'password_changed':
      return PasswordChanged({
        name: payload.name,
        company,
      });

    default:
      return null;
  }
}
