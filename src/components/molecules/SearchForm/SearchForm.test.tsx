import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "./SearchForm";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form />);
  });

  it("updates departure location field", async () => {
    const { getByLabelText, getByTestId } = render(<Form />);

    const inputElem = document.getElementById("Departure location");

    fireEvent.click(inputElem);

    const departureLocationElement = getByLabelText(/Departure location/i);
    fireEvent.change(departureLocationElement, {
      target: { value: "New York" },
    });

    await waitFor(() => {
      expect(getByTestId("flight-search-form")).toHaveFormValues({
        departureLocation: "New York",
      });
    });
  });
});
