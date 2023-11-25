export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
  }