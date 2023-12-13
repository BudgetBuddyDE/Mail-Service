import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export type TWelcomeEmailProps = {
  name?: string;
  company?: string;
};

const WelcomeEmail = ({ name = 'John', company = 'Budget-Buddy' }: TWelcomeEmailProps) => {
  const previewText = `Welcome to ${company}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/logo.png`}
                width="80"
                height="80"
                alt="Logo Example"
                className="my-0 mx-auto rounded"
              />
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to <strong>{company}</strong>, {name}!
            </Heading>
            <Text className="text-sm">Hello {name},</Text>
            <Text className="text-sm">
              We're excited to have you onboard at <strong>{company}</strong>. We hope you enjoy
              your journey with us. If you have any questions or need assistance, feel free to reach
              out.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link href={`${baseUrl}`}>Get Started</Link>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const baseUrl = process.env.URL ? `https://${process.env.URL}` : 'https://app.budget-buddy.de';

export default WelcomeEmail;
