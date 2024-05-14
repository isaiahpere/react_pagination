import { ProductsType } from "../types/products";

interface PaginationProps {
  items: ProductsType[];
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handlePagechange: (curPage: number) => void;
}

const Pagination = ({
  currentPage,
  items,
  handleNextPage,
  handlePrevPage,
  handlePagechange,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "disabled" : ""}`}
      >
        Next
      </button>
      {[...Array(Math.round(items.length / 10))].map((_, index) => (
        <button
          className={`page-number ${
            index + 1 === currentPage ? "selected" : ""
          }`}
          key={`id - ${index + 1}`}
          onClick={() => handlePagechange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === 10}
        className={`${currentPage === 10 ? "disabled" : ""}`}
      >
        Prev
      </button>
    </div>
  );
};

export default Pagination;
