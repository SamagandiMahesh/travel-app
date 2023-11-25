import React, { useState, useEffect } from 'react';
import { PaginationProps } from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, handlePageChange }) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    let numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === 2 || i === totalPages || i === totalPages - 1 || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
        numbers.push(i);
      } else if (i === 3 && currentPage > 3) {
        numbers.push(-1); // Add -1 to represent an ellipsis
      } else if (i === totalPages - 2 && currentPage < totalPages - 2) {
        numbers.push(-1);
      }
    }
    setPageNumbers(numbers);
  }, [currentPage, totalPages]);

  const handleNext = () => {
    let nextPage = Math.min(currentPage + 1, totalPages);
    handlePageChange(nextPage);
  };

  const handlePrevious = () => {
    let prevPage = Math.max(currentPage - 1, 1);
    handlePageChange(prevPage);
  };

  const handlePageNumber = (pageNumber: number) => {
    handlePageChange(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center my-5">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <button className="page-link" onClick={handlePrevious}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className={`page-item ${number === currentPage && 'active'} ${number === -1 && 'disabled'}`}>
            <button className="page-link" onClick={() => number !== -1 && handlePageNumber(number)}>
              {number === -1 ? '...' : number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
