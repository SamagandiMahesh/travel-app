import React from 'react';
import styled from 'styled-components';
import { StyledFooter } from './Footer.styles';
import { FooterProps } from './Footer.types';

export const Footer: React.FC<FooterProps> = ({ label = 'eDreams Odigeo Footer' }) => {
  return (
    <StyledFooter data-testid="footer">
      <p className='my-2'>{label}</p>
    </StyledFooter>
  );
};
