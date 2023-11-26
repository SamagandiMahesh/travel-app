import React from "react";
import { Footer } from "../../atoms/Footer/Footer";
import { Header } from "../../atoms/Header/Header";
import { ComponentSection } from "./Layout.styles";
import { LayoutProps } from "./Layout.types";

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    <ComponentSection className="container-lg mx-auto">
      {children}
    </ComponentSection>
    <Footer />
  </div>
);
