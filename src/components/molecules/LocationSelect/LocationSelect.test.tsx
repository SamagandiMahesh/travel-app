import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { LocationSelect } from "./LocationSelect";
import { Controller } from "react-hook-form";
import selectEvent from "react-select-event";
import { server } from "../../../../mockServer";

console.error = jest.fn();
console.warn = jest.fn();

jest.mock("react-hook-form", () => ({
  Controller: jest.fn(),
}));

beforeAll(() => server.listen()); // Start the mock server
afterEach(() => server.resetHandlers()); // Reset any runtime request handlers we may add during the tests
afterAll(() => server.close()); // Clean up once the tests are done

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
