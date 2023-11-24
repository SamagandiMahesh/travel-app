import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledFooter } from './Footer.styles';
import { FooterProps } from './Footer.types';

export const Footer: React.FC<FooterProps> = ({ label = 'Edreams Odigeo Footer' }) => {
  return (
    <StyledFooter data-testid="footer">
      <label>{label}</label>
    </StyledFooter>
  );
};

 
