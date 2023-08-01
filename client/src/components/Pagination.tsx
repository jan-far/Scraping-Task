import React from "react";
import usePagination from "../hooks/usePagination";
import "./styles.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const siblingCount = 1;

  const pageNumbers = usePagination({
    totalPages,
    currentPage,
    siblingCount,
  });

  return (
    <div className="pagination-container">
      <span style={{ fontWeight: "bold", fontSize: 18 }}>Page: &nbsp;</span>
      {pageNumbers?.map((pageNumber, index) => {
        if (typeof pageNumber === "number") {
          return (
            <a
              key={index}
              onClick={() => onPageChange(pageNumber)}
              className={`pagination-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              {pageNumber}
            </a>
          );
        } else {
          return (
            <span key={index} className="pagination-item disabled">
              {pageNumber}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Pagination;
