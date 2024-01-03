import * as React from 'react';
import { z } from 'zod';
import { Head, Html, Preview, Text } from '@react-email/components';
import { CONFIG } from './cfg';
import { AppConfig } from '../../src/config';
import { ButtonContainer, Layout, Logo, StyledButton } from '../components';

export const ZRequestPasswordChangeProps = z.object({
  name: z.string().default('John Doe'),
  company: z.string().default('Budget Buddy'),
  otp: z.string().uuid().default('no-uuid-provided'),
});
export type TRequestPasswordChangeProps = z.infer<typeof ZRequestPasswordChangeProps>;

export const RequestPasswordChange: React.FC<TRequestPasswordChangeProps> = ({
  name = 'John Doe',
  company = 'Budget Buddy',
  otp = 'no-otp-provided',
}) => {
  const redirectUrl = () => {
    const query = new URLSearchParams({ otp });
    return `${
      (AppConfig.environment === 'PROD' ? CONFIG.webapp : 'http://localhost:3000') +
      '/reset-password'
    }?${query.toString()}`;
  };

  return (
    <Html>
      <Head />
      <Preview>Requested password change</Preview>
      <Layout>
        <Logo />

        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Someone recently requested a password change for your {company} account. If this was you,
          you can set a new password here:
        </Text>

        <ButtonContainer>
          <StyledButton href={redirectUrl()}>Reset password</StyledButton>
        </ButtonContainer>

        <Text style={paragraph}>
          If you don't want to change your password or didn't request this, just ignore and delete
          this message.
        </Text>
        <Text style={paragraph}>
          To keep your account secure, please don't forward this email to anyone.
        </Text>

        <Text style={paragraph}>
          Best Wishes,
          <br />
          The {company} Team
        </Text>
      </Layout>
    </Html>
  );
};

export default RequestPasswordChange;

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
