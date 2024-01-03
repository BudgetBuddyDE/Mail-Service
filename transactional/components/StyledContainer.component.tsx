import React from 'react';
import { Container, type ContainerProps } from '@react-email/components';

export const StyledContainer: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => (
  <Container style={containerStyle} {...props}>
    {children}
  </Container>
);

export const containerStyle = {
  margin: '0 auto',
  // padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #dadce0',
};
