'use client';

import React from 'react';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export interface PaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Current page number (1-based) */
  currentPage: number;
  /** Base URL for pagination links */
  baseUrl: string;
  /** Query parameter name for page */
  pageParam?: string;
  /** Optional CSS classes */
  className?: string;
  /** Optional callback when page changes */
  onPageChange?: (page: number) => void;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
}

/**
 * Pagination component for navigating through paginated content
 * Supports both client-side and server-side pagination
 */
export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  baseUrl,
  pageParam = 'page',
  className = '',
  onPageChange,
  maxPageButtons = 5
}: PaginationProps) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Ensure current page is within bounds
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    // If we have fewer pages than max buttons, show all pages
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, safePage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;
    
    // Adjust if end page is beyond total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  // Generate URL for a specific page
  const getPageUrl = (page: number) => {
    // If it's the first page, don't include the page parameter
    if (page === 1) {
      return baseUrl;
    }
    
    // Check if baseUrl already has query parameters
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${pageParam}=${page}`;
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (onPageChange && page !== safePage) {
      onPageChange(page);
    }
  };
  
  // Render page button
  const renderPageButton = (page: number) => {
    const isCurrentPage = page === safePage;
    
    // Style classes
    const baseClasses = 'flex items-center justify-center w-10 h-10 rounded-md transition-colors';
    const activeClasses = 'bg-blue-600 text-white font-medium';
    const inactiveClasses = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
    
    return (
      <Link
        key={page}
        href={getPageUrl(page)}
        className={`${baseClasses} ${isCurrentPage ? activeClasses : inactiveClasses}`}
        onClick={(e) => {
          if (onPageChange) {
            e.preventDefault();
            handlePageChange(page);
          }
        }}
        aria-current={isCurrentPage ? 'page' : undefined}
        aria-label={`Page ${page}`}
      >
        {page}
      </Link>
    );
  };
  
  // Render previous/next buttons
  const renderNavButton = (direction: 'prev' | 'next') => {
    const isPrev = direction === 'prev';
    const page = isPrev ? safePage - 1 : safePage + 1;
    const isDisabled = isPrev ? safePage <= 1 : safePage >= totalPages;
    
    // Style classes
    const baseClasses = 'flex items-center justify-center px-3 h-10 rounded-md transition-colors';
    const enabledClasses = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
    const disabledClasses = 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed';
    
    const Icon = isPrev ? HiChevronLeft : HiChevronRight;
    const label = isPrev ? 'Previous page' : 'Next page';
    
    if (isDisabled) {
      return (
        <span className={`${baseClasses} ${disabledClasses}`} aria-disabled="true" aria-label={label}>
          <Icon className="w-5 h-5" />
        </span>
      );
    }
    
    return (
      <Link
        href={getPageUrl(page)}
        className={`${baseClasses} ${enabledClasses}`}
        onClick={(e) => {
          if (onPageChange) {
            e.preventDefault();
            handlePageChange(page);
          }
        }}
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </Link>
    );
  };
  
  // Get page numbers to display
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className={`flex items-center justify-center space-x-2 my-8 ${className}`} aria-label="Pagination">
      {/* Previous button */}
      {renderNavButton('prev')}
      
      {/* First page button (if not in range) */}
      {pageNumbers[0] > 1 && (
        <>
          {renderPageButton(1)}
          {pageNumbers[0] > 2 && (
            <span className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}
        </>
      )}
      
      {/* Page buttons */}
      {pageNumbers.map(page => renderPageButton(page))}
      
      {/* Last page button (if not in range) */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}
          {renderPageButton(totalPages)}
        </>
      )}
      
      {/* Next button */}
      {renderNavButton('next')}
    </nav>
  );
}
