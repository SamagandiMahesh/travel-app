import { fireEvent, render, waitFor } from "@testing-library/react";
import { server } from "../../../../mockServer";
import { SearchForm } from "./SearchForm";

beforeAll(() => server.listen()); 
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

console.error = jest.fn();
console.warn = jest.fn();

const useRouter = jest.spyOn(require("next/router"), "useRouter");
const router = { push: jest.fn() };
useRouter.mockReturnValue(router);

jest.mock("../LocationSelect/LocationSelect", () => ({
  LocationSelect: ({ control, name, setValue }) => (
    <div>
      <label htmlFor={name} data-testid={`${name}-label`}>
        Departure location
      </label>
      <select
        id={name}
        name={name}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        data-testid={`${name}-select`}
      >
        <option value="Location 1">Location 1</option>
        <option value="Location 2">Location 2</option>
        <option value="Location 3">Location 3</option>
      </select>
    </div>
  ),
}));
describe("SearchForm", () => {
  it("calls router.push when the form is submitted", async () => {
    const { getByTestId } = render(<SearchForm />);
    const form = getByTestId("flight-search-form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith({
        pathname: "/results",
        query: "",
      });
    });
  });

  it("calls router.push when the form is submitted, with arrival and departure location", async () => {
    const component = render(<SearchForm />);
    const form = component.getByTestId("flight-search-form");

    fireEvent.change(component.getByTestId("departureLocation-select"), {
      target: { value: "Location 1" },
    });
    fireEvent.change(component.getByTestId("arrivalLocation-select"), {
      target: { value: "Location 2" },
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith({
        pathname: "/results",
        query: "departure=Location+1&arrival=Location+2",
      });
    });
  });

  it("calls router.push when the form is submitted, with arrival and departure location and date", async () => {
    const component = render(<SearchForm />);
    const form = component.getByTestId("flight-search-form");

    fireEvent.change(component.getByTestId("departureLocation-select"), {
      target: { value: "Location 1" },
    });
    fireEvent.change(component.getByTestId("arrivalLocation-select"), {
      target: { value: "Location 2" },
    });

    fireEvent.click(component.getByTestId("datepicker-input"));
    fireEvent.click(
      component.getByLabelText("Choose Thursday, November 23rd, 2023"),
    );

    fireEvent.submit(form);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith({
        pathname: "/results",
        query: "departure=Location+1&arrival=Location+2&date=Thu+Nov+23+2023",
      });
    });
  });
});
