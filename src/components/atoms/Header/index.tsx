// components/atoms/Header/Header.tsx

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

interface HeaderProps {
  label?: string;
}

const StyledHeader = styled.header`
  background: #005dad;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header: React.FC<HeaderProps> = ({ label = 'EDreams Odigeo' }) => {
  return (
    <StyledHeader data-testid="header">
      <Link href="/">
        <label>{label}</label>
      </Link>
    </StyledHeader>
  );
};


export default Header;
