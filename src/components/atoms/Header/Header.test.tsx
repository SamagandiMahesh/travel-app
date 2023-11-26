import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    const label = "Test Header";
    const { getByText } = render(<Header label={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it("displays the default label if no label is provided", () => {
    const defaultLabel = "eDreams Odigeo";
    const { getByText } = render(<Header />);
    expect(getByText(defaultLabel)).toBeInTheDocument();
  });
});
