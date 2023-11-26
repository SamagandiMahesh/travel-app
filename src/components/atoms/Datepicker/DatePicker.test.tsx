import React from "react";
import { render } from "@testing-library/react";
import { subDays, format } from "date-fns";
import { ODDatePicker } from "./Datepicker";

console.error = jest.fn();
console.warn = jest.fn();

describe("ODDatePicker", () => {
  const mockDateChangeHandler = jest.fn();
  const selectedDate = subDays(new Date(), 3);
  const formattedDate = format(selectedDate, "MM/dd/yyyy");

  it("renders the date picker wrapper", () => {
    const { container } = render(
      <ODDatePicker
        selectedDate={null}
        dateChangeHandler={mockDateChangeHandler}
      />,
    );
    const datePickerWrapper = container.querySelector(
      ".react-datepicker-wrapper",
    );

    expect(datePickerWrapper).toBeInTheDocument();
  });
});
