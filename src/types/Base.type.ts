import { z } from 'zod';

export const ZDescription = z
  .string()
  .nullable()
  .transform((val) => (typeof val === 'string' && val.length == 0 ? null : val))
  .default(null);
export type TDescription = z.infer<typeof ZDescription>;

export const ZCreatedAt = z
  .date()
  .or(z.number())
  .transform((val) => new Date(val));
export type TCreatedAt = z.infer<typeof ZCreatedAt>;
