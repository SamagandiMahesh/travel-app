import { render } from "@testing-library/react";
import { ODDatePicker } from "./Datepicker";

console.error = jest.fn();
console.warn = jest.fn();

describe("ODDatePicker", () => {
  const mockDateChangeHandler = jest.fn();

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
