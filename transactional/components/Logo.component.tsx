import { Img, type ImgProps } from '@react-email/components';
import React from 'react';
import { SERVICE_URL } from '../emails/cfg';

export const Logo: React.FC<ImgProps> = (props) => (
  <Img {...props} src={`${SERVICE_URL}/static/mails/logo.png`} alt="Logo" style={logoStyle} />
);

export const logoStyle = {
  width: '120px',
  height: '120px',
  margin: '0 auto',
  borderRadius: '8px',
};
