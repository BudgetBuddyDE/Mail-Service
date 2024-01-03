import * as React from 'react';
import { z } from 'zod';
import { Head, Html, Preview, Text, Link } from '@react-email/components';
import { CONFIG } from './cfg';
import { AppConfig } from '../../src/config';
import { Layout, Logo } from '../components';

export const ZPasswordChangedProps = z.object({
  name: z.string().default('John Doe'),
  company: z.string().default('Budget Buddy'),
});
export type TPasswordChangedProps = z.infer<typeof ZPasswordChangedProps>;

export const PasswordChanged: React.FC<TPasswordChangedProps> = ({
  name = 'John Doe',
  company = 'Budget Buddy',
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your password changed</Preview>
      <Layout>
        <Logo />

        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          You're password was changed recently. If this was you, then no further action is required.
          However if you did NOT perform this password change, please{' '}
          <Link
            href={
              (AppConfig.environment === 'PROD' ? CONFIG.webapp : 'http://localhost:3000') +
              '/request-password-reset'
            }
          >
            reset your password
          </Link>{' '}
          immediately.
        </Text>

        <Text style={paragraph}>
          Remember to use a password that is both strong and unique to your account.
        </Text>
        <Text style={paragraph}>Still have questions? Don't mind to contact us</Text>

        <Text style={paragraph}>
          Best Wishes,
          <br />
          The {company} Team
        </Text>
      </Layout>
    </Html>
  );
};

export default PasswordChanged;

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
