
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { StyledHeader } from './Header.styles';
import { HeaderProps } from './Header.types';



export const Header: React.FC<HeaderProps> = ({ label = 'EDreams Odigeo' }) => {
  return (
    <StyledHeader data-testid="header">
      <Link href="/">
        <label>{label}</label>
      </Link>
    </StyledHeader>
  );
};


