import * as React from 'react';
import { z } from 'zod';
import { Head, Html, Preview, Text } from '@react-email/components';
import { AppConfig } from '../../src/config';
import { CONFIG } from './cfg';
import { ButtonContainer, Layout, Logo, StyledButton } from '../components';

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
      <Layout>
        <Logo />

        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          We're thrilled to welcome you to {company}! Before getting started on your journey towards
          smarter budgeting, we need to confirm your email address.
        </Text>

        <ButtonContainer>
          <StyledButton href={redirectUrl()}>Initiate Your Journey</StyledButton>
        </ButtonContainer>

        <Text style={paragraph}>
          If you have any questions, please feel free to contact us. We're here to help!
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

export default WelcomeMail;

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
