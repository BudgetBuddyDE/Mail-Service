import * as React from 'react';
import { z } from 'zod';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';
import { SERVICE_URL, CONFIG } from './cfg';
import { AppConfig } from '../../src/config';

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
      <Body style={main}>
        <Container style={container}>
          <Img src={`${SERVICE_URL}/static/mails/logo.png`} alt="Logo" style={logo} />

          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Someone recently requested a password change for your Dropbox account. If this was you,
            you can set a new password here:
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={redirectUrl()}>
              Reset password
            </Button>
          </Section>

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

          <Hr style={hr} />

          <Link href={CONFIG.website} style={footer}>
            Website
          </Link>
          <Link href={CONFIG.webapp} style={footer}>
            Webapp
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default RequestPasswordChange;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  width: '120px',
  height: '120px',
  margin: '0 auto',
  borderRadius: '8px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#151936',
  borderRadius: '3px',
  padding: '.7rem',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '1rem',
  marginRight: '1rem',
};
