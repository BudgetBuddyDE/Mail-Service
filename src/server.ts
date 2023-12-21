import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import express, { Request, Response } from 'express';
import path from 'path';
import { WelcomeMail } from '../transactional/emails/welcome';
import { resend } from './lib/resend';
import { ELogCategory, log, logMiddleware } from './middleware';
import { AppConfig } from './config';
import cors from 'cors';
import { UserService } from './services';
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces';
import bodyParser from 'body-parser';

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
app.use('/static', express.static(path.join(__dirname, '../public')));

const ZSendMailPayload = z.object({
  // from: z.string().default('Welcome <welcome@mail.budget-buddy.de>'),
  to: z.array(z.string().email()).or(z.string().email()),
  mail: z.enum(['welcome']).default('welcome'),
  uuid: z.string().uuid(),
});
export type TSendMailPayload = z.infer<typeof ZSendMailPayload>;

app.post('/send', async (req: Request, res: Response) => {
  const reqBody = req.body;
  try {
    if (!reqBody) {
      throw new Error('No body provided');
    }

    const parsedBody = ZSendMailPayload.safeParse(reqBody);
    if (!parsedBody.success) {
      throw new Error("Body doesn't match schema");
    }

    const [userDetails, err] = await UserService.getDetails(parsedBody.data.uuid, {
      uuid: process.env.SERVICE_USER_UUID!,
      password: process.env.SERVICE_USER_PASSWORD!,
    });
    if (err || !userDetails) {
      throw new Error(err ? err.message : 'Could not retrieve user details');
    }

    const emailData = {
      from: 'Welcome <welcome@mail.budget-buddy.de>',
      to: parsedBody.data.to,
      subject: getSubject(parsedBody.data.mail),
      react: WelcomeMail({
        uuid: userDetails.uuid,
        name: userDetails.name,
        email: userDetails.email,
        company: 'Budget Buddy',
      }),
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

function getSubject(mail: TSendMailPayload['mail']) {
  switch (mail) {
    case 'welcome':
      return 'Welcome to Budget Buddy';

    default:
      return 'unknown subject';
  }
}
