import { z } from 'zod';
import { ZRole } from './role.type';
import { ZCreatedAt } from './Base.type';

export const ZUser = z.object({
  uuid: z.string().uuid(),
  role: ZRole,
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  createdAt: ZCreatedAt,
});
export type TUser = z.infer<typeof ZUser>;
