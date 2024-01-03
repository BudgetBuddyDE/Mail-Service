import React from 'react';
import { Section, type SectionProps } from '@react-email/components';
import { StyledLink } from './StyledLink.component';
import { CONFIG } from '../emails/cfg';

export const Footer: React.FC<SectionProps> = ({ ...props }) => (
  <Section style={footerStyle} {...props}>
    <StyledLink href={CONFIG.website}>Website</StyledLink>
    <StyledLink href={CONFIG.webapp}>Webapp</StyledLink>
  </Section>
);

export const footerStyle = {
  borderTop: '1px solid #dadce0',
  padding: '1rem',
};
