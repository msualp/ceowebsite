'use client';

import React from 'react';
import { HiFunnel, HiOutlineBookmark, HiOutlineClock, HiOutlineBolt, HiOutlineStar } from 'react-icons/hi2';

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategoryFilterProps {
  /** Array of category items */
  categories: CategoryItem[];
  /** Currently selected category ID */
  selectedCategory: string;
  /** Handler for category change */
  onCategoryChange: (category: string) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * CategoryFilter component for filtering blog posts by category
 */
export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ''
}: CategoryFilterProps) {
  return (
    <div className={`relative flex overflow-x-auto pb-4 mb-4 hide-scrollbar snap-x snap-mandatory md:snap-none md:justify-center ${className}`}>
      <div className="flex gap-2 px-4 md:px-0 md:flex-wrap">
        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              snap-start inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${category.id === selectedCategory 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'}
            `}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Default categories for blog posts
 */
export const defaultCategories: CategoryItem[] = [
  { id: 'all', name: 'All Articles', icon: <HiFunnel className="w-4 h-4" /> },
  { id: 'ai-collaboration', name: 'AI Collaboration', icon: <HiOutlineBolt className="w-4 h-4" /> },
  { id: 'product-vision', name: 'Product Vision', icon: <HiOutlineStar className="w-4 h-4" /> },
  { id: 'entrepreneurship', name: 'Entrepreneurship', icon: <HiOutlineBookmark className="w-4 h-4" /> },
  { id: 'future-of-work', name: 'Future of Work', icon: <HiOutlineClock className="w-4 h-4" /> },
  { id: 'technical', name: 'Technical', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 3L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 19H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];
