import React from "react";

const PaginationNavigator = ({
                                 currentPage,
                                 totalPages,
                                 goToPrevPage,
                                 goToNextPage,
                             }) => {
    return (
        <div className= "pagination-navigator">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default PaginationNavigator;