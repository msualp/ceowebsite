import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryFilter } from '@/components/blog';
import { HiOutlineBookmark } from 'react-icons/hi2';

describe('CategoryFilter Component', () => {
  const mockCategories = [
    { id: 'all', name: 'All Articles', icon: <HiOutlineBookmark className="w-4 h-4" /> },
    { id: 'ai-collaboration', name: 'AI Collaboration', icon: <HiOutlineBookmark className="w-4 h-4" /> },
    { id: 'product-vision', name: 'Product Vision', icon: <HiOutlineBookmark className="w-4 h-4" /> },
  ];

  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  test('renders all categories', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    expect(screen.getByText('All Articles')).toBeInTheDocument();
    expect(screen.getByText('AI Collaboration')).toBeInTheDocument();
    expect(screen.getByText('Product Vision')).toBeInTheDocument();
  });

  test('applies selected style to the selected category', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="ai-collaboration" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    const selectedButton = screen.getByText('AI Collaboration').closest('button');
    const unselectedButton = screen.getByText('Product Vision').closest('button');
    
    expect(selectedButton).toHaveClass('bg-blue-100');
    expect(unselectedButton).toHaveClass('bg-gray-100');
  });

  test('calls onCategoryChange when a category is clicked', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    fireEvent.click(screen.getByText('AI Collaboration'));
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('ai-collaboration');
  });

  test('applies custom className', () => {
    const { container } = render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={mockOnCategoryChange}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('renders nothing when categories array is empty', () => {
    const { container } = render(
      <CategoryFilter 
        categories={[]} 
        selectedCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    // The component should still render the container div, but it will be empty
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes.length).toBe(1); // Just the inner div
    expect(container.firstChild?.firstChild?.childNodes.length).toBe(0); // No category buttons
  });

  test('renders with icons', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    // Each category should have an icon
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBe(mockCategories.length);
  });
});
