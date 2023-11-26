import React from "react";
import { StyledFooter } from "./Footer.styles";
import { FooterProps } from "./Footer.types";

/**
 * `Footer` is a React component that renders a footer with a customizable label.
 *
 * @component
 * @example
 * ```tsx
 * <Footer label="My Website Footer" />
 * ```
 *
 * @param {object} props - The properties that define the `Footer` component.
 * @param {string} [props.label="eDreams Odigeo Footer"] - The label to display in the footer.
 */
export const Footer: React.FC<FooterProps> = ({
  label = "eDreams Odigeo Footer",
}) => {
  return (
    <StyledFooter data-testid="footer">
      <p className="my-2">{label}</p>
    </StyledFooter>
  );
};
