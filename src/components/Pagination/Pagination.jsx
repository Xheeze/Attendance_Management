// Pagination.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, totalRecords, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalRecords);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page with neighbors, and last page
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <div>
          Showing <span className="pagination-info-number">{startRecord}</span> to{' '}
          <span className="pagination-info-number">{endRecord}</span> of{' '}
          <span className="pagination-info-number">{totalRecords}</span> results
        </div>
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select 
            id="items-per-page"
            value={itemsPerPage} 
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="select select-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          Previous
        </button>
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-button ${currentPage === page ? 'pagination-button-active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;