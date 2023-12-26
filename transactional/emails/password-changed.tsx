import * as React from 'react';
import { z } from 'zod';
import { Body, Container, Head, Hr, Html, Img, Preview, Text, Link } from '@react-email/components';
import { CONFIG, SERVICE_URL } from './cfg';
import { AppConfig } from '../../src/config';

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
      <Body style={main}>
        <Container style={container}>
          <Img src={`${SERVICE_URL}/static/mails/logo.png`} alt="Logo" style={logo} />

          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            You're password was changed recently. If this was you, then no further action is
            required. However if you did NOT perform this password change, please{' '}
            <Link
              href={
                (AppConfig.environment === 'PROD' ? CONFIG.webapp : 'http://localhost:3000') +
                '/request-password-reset'
              }
            >
              reset your account password
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

export default PasswordChanged;

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
