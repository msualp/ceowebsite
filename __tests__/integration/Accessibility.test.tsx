import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// Import components to test
import { ArticleCard, ArticleTags, CategoryFilter, ResponsiveImage } from '@/components/blog';
import { HiOutlineBookmark } from 'react-icons/hi2';

// Add custom matcher
expect.extend(toHaveNoViolations);

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Accessibility Tests', () => {
  // Sample data for testing
  const mockArticle = {
    slug: 'test-article',
    title: 'Test Article Title',
    date: '2025-04-16',
    excerpt: 'This is a test article excerpt for testing purposes.',
    category: 'ai-collaboration',
    author: 'Test Author',
    authorTitle: 'Test Author Title',
    readTime: '5 min read',
    image: '/images/test-image.jpg',
    imageAlt: 'Test image alt text',
    tags: ['collaborative-ai', 'thought-piece', 'future'],
    featured: false,
  };

  const mockCategories = [
    { id: 'all', name: 'All Articles', icon: <HiOutlineBookmark className="w-4 h-4" /> },
    { id: 'ai-collaboration', name: 'AI Collaboration', icon: <HiOutlineBookmark className="w-4 h-4" /> },
    { id: 'product-vision', name: 'Product Vision', icon: <HiOutlineBookmark className="w-4 h-4" /> },
  ];

  test('ArticleCard has no accessibility violations', async () => {
    const { container } = render(<ArticleCard article={mockArticle} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('ArticleTags has no accessibility violations', async () => {
    const { container } = render(<ArticleTags tags={mockArticle.tags} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('CategoryFilter has no accessibility violations', async () => {
    const { container } = render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={() => {}} 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('ResponsiveImage has no accessibility violations', async () => {
    const { container } = render(
      <ResponsiveImage 
        src={mockArticle.image} 
        alt={mockArticle.imageAlt} 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('ArticleCard with missing alt text should have accessibility violations', async () => {
    // Create a copy of the mock article with missing alt text
    const articleWithoutAlt = { 
      ...mockArticle, 
      imageAlt: '', 
      image: '/images/test-image.jpg' 
    };
    
    const { container } = render(<ArticleCard article={articleWithoutAlt} showImage={true} />);
    const results = await axe(container);
    
    // This should have violations due to missing alt text
    expect(results.violations.length).toBeGreaterThan(0);
    
    // Check if one of the violations is related to images
    const hasImageViolation = results.violations.some(
      (violation: any) => violation.id === 'image-alt'
    );
    
    expect(hasImageViolation).toBe(true);
  });

  test('ArticleCard with proper alt text should not have image-alt violations', async () => {
    const { container } = render(<ArticleCard article={mockArticle} showImage={true} />);
    const results = await axe(container);
    
    // Check if there are no image-alt violations
    const hasImageViolation = results.violations.some(
      (violation: any) => violation.id === 'image-alt'
    );
    
    expect(hasImageViolation).toBe(false);
  });

  test('CategoryFilter buttons should be keyboard accessible', async () => {
    const { container } = render(
      <CategoryFilter 
        categories={mockCategories} 
        selectedCategory="all" 
        onCategoryChange={() => {}} 
      />
    );
    
    // Check if all buttons have role="button"
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(mockCategories.length);
    
    // Check if all buttons have accessible names
    buttons.forEach((button, index) => {
      expect(button).toHaveAccessibleName(mockCategories[index].name);
    });
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
