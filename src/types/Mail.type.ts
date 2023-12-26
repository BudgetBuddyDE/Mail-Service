import { z } from 'zod';

export enum EMailTemplates {
  WELCOME = 'welcome',
  RESET_PASSWORD = 'reset_password',
  PASSWORD_CHANGED = 'password_changed',
}

export const ZWelcomeMailPayload = z.object({
  mail: z.enum([EMailTemplates.WELCOME]),
  uuid: z.string().uuid(),
});
export type TWelcomeMailPayload = z.infer<typeof ZWelcomeMailPayload>;

export const ZResetPasswordPayload = z.object({
  mail: z.enum([EMailTemplates.RESET_PASSWORD]),
  uuid: z.string().uuid(),
  otp: z.string().uuid(),
});
export type TResetPasswordPayload = z.infer<typeof ZResetPasswordPayload>;

export const ZPasswordChangedPayload = z.object({
  mail: z.enum([EMailTemplates.PASSWORD_CHANGED]),
  name: z.string(),
  targetMailAddress: z.string().email(),
});
export type TPasswordChangedPayload = z.infer<typeof ZPasswordChangedPayload>;
