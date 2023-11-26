import { fireEvent, render } from "@testing-library/react";
import { ODSelect } from "./Select";

describe("ODSelect", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <ODSelect options={[]} onChange={jest.fn()} />,
    );
    expect(getByTestId("location-select")).toBeInTheDocument();
  });

  it("calls onChange when the selected option changes", async () => {
    const mockOnChange = jest.fn();
    const options = [{ value: "test", label: "Test" }];
    const { container } = render(
      <ODSelect options={options} onChange={mockOnChange} />,
    );

    // Simulate opening the dropdown
    const dropdownIndicator = container.querySelector(
      ".od__dropdown-indicator",
    );
    fireEvent.mouseDown(dropdownIndicator);

    // Simulate selecting an option
    // Assuming that the dropdown opens and adds options to the DOM
    const option = container.querySelector(".od__option");
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays the placeholder when no option is selected", () => {
    const { container } = render(
      <ODSelect options={[]} onChange={jest.fn()} />,
    );
    const placeholder = container.querySelector(".od__placeholder");
    expect(placeholder.textContent).toEqual("Select...");
  });
});
