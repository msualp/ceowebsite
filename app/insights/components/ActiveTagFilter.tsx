'use client';

import React from 'react';
import { HiOutlineTag } from 'react-icons/hi2';

interface ActiveTagFilterProps {
  /** The currently selected tag */
  selectedTag: string;
  /** Handler for tag selection */
  onTagSelect: (tag: string) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * ActiveTagFilter component for displaying and clearing active tag filters
 */
export default function ActiveTagFilter({
  selectedTag,
  onTagSelect,
  className = ''
}: ActiveTagFilterProps) {
  if (!selectedTag) return null;

  return (
    <div className={`flex items-center mb-4 px-4 md:px-0 ${className}`}>
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filter:</span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        <HiOutlineTag className="mr-1 w-3 h-3" />
        {selectedTag}
        <button 
          onClick={() => onTagSelect('')}
          className="ml-1 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
          aria-label="Clear tag filter"
        >
          ×
        </button>
      </span>
    </div>
  );
}
