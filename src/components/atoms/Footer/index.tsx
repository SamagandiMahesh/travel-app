import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface FooterProps {
  label?: string;
}

const StyledFooter = styled.footer`
  background: #fff;
  color: #000;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px dashed #c1c1c1;
`;

const Footer: React.FC<FooterProps> = ({ label = 'Edreams Odigeo Footer' }) => {
  return (
    <StyledFooter data-testid="footer">
      <label>{label}</label>
    </StyledFooter>
  );
};

Footer.propTypes = {
  label: PropTypes.string,
};

export default Footer;
