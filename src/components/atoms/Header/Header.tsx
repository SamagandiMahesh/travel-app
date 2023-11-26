import React from "react";
import Link from "next/link";
import { StyledH1, StyledHeader } from "./Header.styles";
import { HeaderProps } from "./Header.types";

export const Header: React.FC<HeaderProps> = ({ label = "eDreams Odigeo" }) => {
  return (
    <StyledHeader data-testid="header">
      <Link href="/">
        <StyledH1>{label}</StyledH1>
      </Link>
    </StyledHeader>
  );
};
