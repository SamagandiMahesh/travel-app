import Link from "next/link";
import React from "react";
import { StyledH1, StyledHeader } from "./Header.styles";
import { HeaderProps } from "./Header.types";

/**
 * `Header` is a React component that renders a header with a link to the home page.
 * The link text is customizable via the `label` prop.
 *
 * @component
 * @example
 * ```tsx
 * <Header label="My Website" />
 * ```
 *
 * @param {object} props - The properties that define the `Header` component.
 * @param {string} [props.label="eDreams Odigeo"] - The text to display in the link to the home page.
 */
export const Header: React.FC<HeaderProps> = ({ label = "eDreams Odigeo" }) => {
  return (
    <StyledHeader data-testid="header">
      <Link href="/">
        <StyledH1>{label}</StyledH1>
      </Link>
    </StyledHeader>
  );
};
