import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleCard } from '@/components/blog';
import { Article } from '@/types/blog';

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

describe('ArticleCard Component', () => {
  const mockArticle: Article = {
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

  test('renders the article title', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  test('renders the article excerpt when showExcerpt is true', () => {
    render(<ArticleCard article={mockArticle} showExcerpt={true} />);
    expect(screen.getByText('This is a test article excerpt for testing purposes.')).toBeInTheDocument();
  });

  test('does not render the article excerpt when showExcerpt is false', () => {
    render(<ArticleCard article={mockArticle} showExcerpt={false} />);
    expect(screen.queryByText('This is a test article excerpt for testing purposes.')).not.toBeInTheDocument();
  });

  test('renders the article date when showDate is true', () => {
    render(<ArticleCard article={mockArticle} showDate={true} />);
    // Date should be formatted, so we check for a partial match
    expect(screen.getByText(/Apr 16, 2025/)).toBeInTheDocument();
  });

  test('renders the article category when showCategory is true', () => {
    render(<ArticleCard article={mockArticle} showCategory={true} />);
    expect(screen.getByText('ai-collaboration')).toBeInTheDocument();
  });

  test('renders the article tags when showTags is true', () => {
    render(<ArticleCard article={mockArticle} showTags={true} />);
    expect(screen.getByText('collaborative-ai')).toBeInTheDocument();
    expect(screen.getByText('thought-piece')).toBeInTheDocument();
    expect(screen.getByText('future')).toBeInTheDocument();
  });

  test('renders the article image when showImage is true', () => {
    render(<ArticleCard article={mockArticle} showImage={true} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image alt text');
  });

  test('does not render the article image when showImage is false', () => {
    render(<ArticleCard article={mockArticle} showImage={false} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('renders the article read time when showReadTime is true', () => {
    render(<ArticleCard article={mockArticle} showReadTime={true} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  test('applies the correct variant class', () => {
    const { container } = render(<ArticleCard article={mockArticle} variant="featured" />);
    // Check if the container has the featured variant class
    expect(container.firstChild).toHaveClass('featured-variant');
  });

  test('renders a link to the article', () => {
    render(<ArticleCard article={mockArticle} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/insights/test-article');
  });
});
