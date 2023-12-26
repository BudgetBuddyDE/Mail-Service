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
import { AppConfig } from '../../src/config';
import { CONFIG, SERVICE_URL } from './cfg';

export const ZWelcomeMailProps = z.object({
  uuid: z.string(),
  name: z.string().default('John Doe'),
  email: z.string().email(),
  company: z.string().optional().default('Budget Buddy'),
});
export type TWelcomeMailProps = z.infer<typeof ZWelcomeMailProps>;

export const WelcomeMail: React.FC<TWelcomeMailProps> = ({
  uuid = 'no-uuid-provided',
  name = 'John Doe',
  email = 'john.doe@budget-buddy.de',
  company = 'Budget Buddy',
}) => {
  const redirectUrl = () => {
    const query = new URLSearchParams({
      uuid,
      mailAddress: email,
      returnTo:
        (AppConfig.environment === 'PROD' ? CONFIG.webapp : 'http://localhost:3000') +
        '/verify-email',
    });
    return `${CONFIG.authMailVerifyEndpoint}?${query.toString()}`;
  };

  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${SERVICE_URL}/static/mails/logo.png`} alt="Logo" style={logo} />

          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            We're thrilled to welcome you to {company}! Before getting started on your journey
            towards smarter budgeting, we need to confirm your email address.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={redirectUrl()}>
              Initiate Your Journey
            </Button>
          </Section>

          <Text style={paragraph}>
            If you have any questions, please feel free to contact us. We're here to help!
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

export default WelcomeMail;

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
