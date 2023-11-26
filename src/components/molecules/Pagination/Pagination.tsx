import React, { useState, useEffect } from "react";
import { PaginationProps } from "./Pagination.types";

/**
 * `Pagination` is a React component that provides a user interface for navigating through paged data.
 * It displays page numbers and "Previous" and "Next" buttons. It also supports ellipsis (...) for large number of pages.
 *
 * @component
 * @example
 * ```tsx
 * <Pagination totalPages={10} currentPage={1} handlePageChange={(pageNumber) => console.log(pageNumber)} />
 * ```
 *
 * @param {object} props - The properties that define the `Pagination` component.
 * @param {number} props.totalPages - The total number of pages that can be navigated to.
 * @param {number} props.currentPage - The page number that is currently active.
 * @param {(pageNumber: number) => void} props.handlePageChange - The function that is called when a page number is clicked. It receives the clicked page number as its argument.
 */
export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    let numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === 2 ||
        i === totalPages ||
        i === totalPages - 1 ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        numbers.push(i);
      } else if (i === 3 && currentPage > 3) {
        numbers.push(-1); // Add -1 to represent an ellipsis
      } else if (i === totalPages - 2 && currentPage < totalPages - 2) {
        numbers.push(-1);
      }
    }
    setPageNumbers(numbers);
  }, [currentPage, totalPages]);

  /**
   * Handles the click event of the "Next" button.
   * It increments the current page number by 1, but not beyond the total number of pages.
   */
  const handleNext = () => {
    let nextPage = Math.min(currentPage + 1, totalPages);
    handlePageChange(nextPage);
  };

  /**
   * Handles the click event of the "Previous" button.
   * It decrements the current page number by 1, but not below 1.
   */
  const handlePrevious = () => {
    let prevPage = Math.max(currentPage - 1, 1);
    handlePageChange(prevPage);
  };

  /**
   * Handles the click event of a page number button.
   * It sets the current page number to the clicked page number.
   *
   * @param {number} pageNumber - The page number that was clicked.
   */
  const handlePageNumber = (pageNumber: number) => {
    handlePageChange(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center my-5">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button className="page-link" onClick={handlePrevious}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`page-item ${number === currentPage && "active"} ${
              number === -1 && "disabled"
            }`}
          >
            <button
              className="page-link"
              onClick={() => number !== -1 && handlePageNumber(number)}
            >
              {number === -1 ? "..." : number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
