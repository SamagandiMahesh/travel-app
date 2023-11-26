import { act, render } from "@testing-library/react";
import { Controller } from "react-hook-form";
import { server } from "../../../../mockServer";
import { LocationSelect } from "./LocationSelect";

console.error = jest.fn();
console.warn = jest.fn();

jest.mock("react-hook-form", () => ({
  Controller: jest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LocationSelect", () => {
  it("renders correctly", async () => {
    (Controller as jest.Mock).mockImplementation(({ render }) =>
      render({ field: { onChange: jest.fn() } }),
    );

    let component;

    await act(async () => {
      component = render(
        <LocationSelect control={jest.fn()} name="test" setValue={jest.fn()} />,
      );
    });

    expect(component).toBeTruthy();
  });
});
