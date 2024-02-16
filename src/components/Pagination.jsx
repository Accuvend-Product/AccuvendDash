
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Search,
  } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, goToPage, getCanPreviousPage , getCanNextPage }) => {
    const handlePrevPage = () => {
        console.log(currentPage)
      goToPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
        console.log(currentPage)
      goToPage(currentPage + 1);
    };
  
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="flex justify-between items-center gap-5">
          <span className="mr-2">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center">
            <button
              onClick={handlePrevPage}
              disabled={!getCanPreviousPage}
              className={`px-1.5 py-1 rounded-l-md text-white bg-primary ${
                !getCanPreviousPage ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNextPage}
              disabled={!getCanNextPage}
              className={`px-1.5 py-1 rounded-r-md text-white bg-primary ${
                !getCanNextPage ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  };