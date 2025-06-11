import React from "react";
import "../styles/Pagination.css";

const PaginationNavigator = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <div id="pagination">
      <div>
        <button
          className="paginationButton"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="M4 3l8 9-8 9z" />
            <path d="M12 3l8 9-8 9z" />
          </svg>
        </button>
      </div>
      <div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <div>
        <button
          className="paginationButton"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M4 3l8 9-8 9z" />
            <path d="M12 3l8 9-8 9z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationNavigator;
