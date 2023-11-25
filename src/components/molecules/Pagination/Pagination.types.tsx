export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePrevious: () => void;
    handleNext: () => void;
    handlePageNumber: (pageNumber: number) => void;
  }