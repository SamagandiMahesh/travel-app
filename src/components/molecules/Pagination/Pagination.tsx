import React from 'react';
import { PaginationProps } from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePrevious, handleNext, handlePageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    // Always display the first 2 pages, the last 2 pages, and 2 pages on either side of the current page
    if (i === 1 || i === 2 || i === totalPages || i === totalPages - 1 || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
      pageNumbers.push(i);
    } else if (i === 3 && currentPage > 3) {
      // Add an ellipsis instead of a page number if the current page is greater than 3
      pageNumbers.push('...');
    } else if (i === totalPages - 2 && currentPage < totalPages - 2) {
      // Add an ellipsis instead of a page number if the current page is less than totalPages - 2
      pageNumbers.push('...');
    }
  }

  return (
    <nav>
      <ul className="pagination justify-content-center my-5">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <button className="page-link" onClick={handlePrevious}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className={`page-item ${number === currentPage && 'active'} ${number === '...' && 'disabled'}`}>
            <button className="page-link" onClick={() => number !== '...' && handlePageNumber(+number)}>
              {number}
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
