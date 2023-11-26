import { render } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId("footer")).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    const label = "Test Footer";
    const { getByText } = render(<Footer label={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it("displays the default label if no label is provided", () => {
    const defaultLabel = "eDreams Odigeo Footer";
    const { getByText } = render(<Footer />);
    expect(getByText(defaultLabel)).toBeInTheDocument();
  });
});
