import React from 'react';
import { Link, type LinkProps } from '@react-email/components';

export const StyledLink: React.FC<LinkProps> = ({ ...props }) => (
  <Link style={linkStyle} {...props} />
);

export const linkStyle = {
  color: '#8898aa',
  fontSize: '1rem',
  marginRight: '1rem',
};
