import { fireEvent, render } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders correctly", () => {
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />,
    );

    expect(getByText("Previous")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("...")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  it("calls handlePageChange with correct argument when next button is clicked", () => {
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />,
    );
    fireEvent.click(getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls handlePageChange with correct argument when previous button is clicked", () => {
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={10}
        currentPage={2}
        handlePageChange={handlePageChange}
      />,
    );

    fireEvent.click(getByText("Previous"));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it("calls handlePageChange with correct argument when page number is clicked", () => {
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />,
    );

    fireEvent.click(getByText("10"));
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });
});
