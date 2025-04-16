'use client';

import React from 'react';
import { Category } from '@/types/blog';

export interface CategoryFilterProps {
  /** Array of categories */
  categories: Category[];
  /** Currently selected category */
  selectedCategory: string;
  /** Handler for category change */
  onCategoryChange: (categoryId: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to center the categories on desktop */
  centerOnDesktop?: boolean;
  /** Whether to make the filter scrollable on mobile */
  scrollableOnMobile?: boolean;
}

/**
 * CategoryFilter component for filtering articles by category
 */
export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className = '',
  centerOnDesktop = true,
  scrollableOnMobile = true
}: CategoryFilterProps) {
  if (!categories || categories.length === 0) return null;
  
  return (
    <div 
      className={`
        ${scrollableOnMobile ? 'relative flex overflow-x-auto pb-4 mb-4 hide-scrollbar snap-x snap-mandatory' : 'flex flex-wrap gap-2'} 
        ${centerOnDesktop ? 'md:snap-none md:justify-center' : ''}
        ${className}
      `}
    >
      <div className={`flex gap-2 px-4 md:px-0 ${centerOnDesktop ? 'md:flex-wrap' : ''}`}>
        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              ${scrollableOnMobile ? 'snap-start' : ''} 
              inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${category.id === selectedCategory 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'}
            `}
            aria-current={category.id === selectedCategory ? 'page' : undefined}
          >
            {category.icon && <span className="mr-1.5">{category.icon}</span>}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Create a category filter with URL integration
 * This is a higher-order component that adds URL integration to the CategoryFilter
 */
export function CategoryFilterWithUrl({
  categories,
  selectedCategory,
  urlParamName = 'category',
  ...props
}: Omit<CategoryFilterProps, 'onCategoryChange'> & { urlParamName?: string }) {
  // Handle category change with URL update
  const handleCategoryChange = (categoryId: string) => {
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set(urlParamName, categoryId);
    window.history.pushState({}, '', url);
    
    // Dispatch a custom event that page components can listen for
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: { categoryId } }));
  };
  
  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
      {...props}
    />
  );
}
