import React from "react";
import styles from "./Pagination.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if there's only one page

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prevButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`${styles.pageButton} ${
            currentPage === index + 1 ? styles.active : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={styles.nextButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;