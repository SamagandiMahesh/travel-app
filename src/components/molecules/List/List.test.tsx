import React from "react";
import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  it("renders correctly", () => {
    const mockData = [
      {
        carrier: "Test Airline",
        departureLocation: "Test Departure",
        departureDate: {
          year: 2022,
          month: 1,
          dayOfMonth: 1,
          hourOfDay: 0,
          minute: 0,
          second: 0,
        },
        arrivalLocation: "Test Arrival",
        arrivalDate: {
          year: 2022,
          month: 1,
          dayOfMonth: 1,
          hourOfDay: 0,
          minute: 0,
          second: 0,
        },
        price: 23,
      },
    ];

    render(<List label="Test Label" filteredList={mockData} />);

    expect(screen.getByText("Test Airline")).toBeInTheDocument();
    expect(screen.getByText("Test Departure")).toBeInTheDocument();
    expect(screen.getByText("Test Arrival")).toBeInTheDocument();
    expect(screen.getByText("23")).toBeInTheDocument();
  });

  it("renders Airlines text default", () => {
    const mockData = [
      {
        carrier: "Test Airline",
        departureLocation: "Test Departure",
        departureDate: {
          year: 2022,
          month: 1,
          dayOfMonth: 1,
          hourOfDay: 0,
          minute: 0,
          second: 0,
        },
        arrivalLocation: "Test Arrival",
        arrivalDate: {
          year: 2022,
          month: 1,
          dayOfMonth: 1,
          hourOfDay: 0,
          minute: 0,
          second: 0,
        },
        price: 23,
      },
    ];

    render(<List filteredList={mockData} />);

    expect(screen.getByText("Airlines:")).toBeInTheDocument();
  });
});
