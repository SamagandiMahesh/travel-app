import React from "react";
import { ComponentSection } from "./Layout.styles";
import { LayoutProps } from "./Layout.types";
import { Header } from "../../atoms/Header/Header";
import { Footer } from "../../atoms/Footer/Footer";

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    <ComponentSection className="container-lg mx-auto">
      {children}
    </ComponentSection>
    <Footer />
  </div>
);
