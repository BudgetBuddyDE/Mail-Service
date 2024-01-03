import React from 'react';
import { StyledBody } from './StyledBody.component';
import { StyledContainer } from './StyledContainer.component';
import { Footer } from './Footer.component';
import { Section } from '@react-email/components';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <StyledBody>
    <StyledContainer>
      <Section style={contentContainerStyle}>{children}</Section>
      <Footer />
    </StyledContainer>
  </StyledBody>
);

export const contentContainerStyle = {
  padding: '1rem',
};
