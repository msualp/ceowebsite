import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InsightsPage from '@/app/insights/page-modular';

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

// Mock the getInsights function
jest.mock('@/app/insights/getInsights', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(mockArticles)),
}));

// Mock articles data
const mockArticles = [
  {
    slug: 'test-article-1',
    title: 'Test Article 1',
    date: '2025-04-16',
    excerpt: 'This is a test article excerpt for the first article.',
    category: 'ai-collaboration',
    author: 'Test Author',
    authorTitle: 'Test Author Title',
    readTime: '5 min read',
    image: '/images/test-image-1.jpg',
    imageAlt: 'Test image alt text 1',
    tags: ['collaborative-ai', 'thought-piece', 'future'],
    featured: true,
  },
  {
    slug: 'test-article-2',
    title: 'Test Article 2',
    date: '2025-04-15',
    excerpt: 'This is a test article excerpt for the second article.',
    category: 'product-vision',
    author: 'Test Author',
    authorTitle: 'Test Author Title',
    readTime: '3 min read',
    image: '/images/test-image-2.jpg',
    imageAlt: 'Test image alt text 2',
    tags: ['product-vision', 'framework', 'present'],
    featured: false,
  },
  {
    slug: 'test-article-3',
    title: 'Test Article 3',
    date: '2025-04-14',
    excerpt: 'This is a test article excerpt for the third article.',
    category: 'entrepreneurship',
    author: 'Test Author',
    authorTitle: 'Test Author Title',
    readTime: '7 min read',
    image: '/images/test-image-3.jpg',
    imageAlt: 'Test image alt text 3',
    tags: ['entrepreneurship', 'personal-reflection', 'history'],
    featured: false,
  },
];

// Mock the useSearchParams hook
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => {
      if (param === 'category') return null;
      if (param === 'tag') return null;
      return null;
    }),
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('InsightsPage Integration', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the page with featured article and article list', async () => {
    render(<InsightsPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // Check if the featured article is rendered
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      
      // Check if the article list is rendered
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
      expect(screen.getByText('Test Article 3')).toBeInTheDocument();
    });
  });

  test('filters articles by category when category is selected', async () => {
    // Mock the useSearchParams to return a category
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockImplementation(() => ({
      get: (param: string) => {
        if (param === 'category') return 'ai-collaboration';
        return null;
      },
    }));
    
    render(<InsightsPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // Only the AI Collaboration article should be visible
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Article 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Article 3')).not.toBeInTheDocument();
    });
  });

  test('filters articles by tag when tag is selected', async () => {
    // Mock the useSearchParams to return a tag
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockImplementation(() => ({
      get: (param: string) => {
        if (param === 'tag') return 'framework';
        return null;
      },
    }));
    
    render(<InsightsPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // Only the article with the framework tag should be visible
      expect(screen.queryByText('Test Article 1')).not.toBeInTheDocument();
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
      expect(screen.queryByText('Test Article 3')).not.toBeInTheDocument();
    });
  });

  test('displays correct number of articles', async () => {
    render(<InsightsPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // There should be 3 articles in total (1 featured + 2 in the list)
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBe(3);
    });
  });

  test('displays correct tags for each article', async () => {
    render(<InsightsPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // Check if the tags are rendered for the featured article
      expect(screen.getByText('collaborative-ai')).toBeInTheDocument();
      expect(screen.getByText('thought-piece')).toBeInTheDocument();
      expect(screen.getByText('future')).toBeInTheDocument();
      
      // Check if the tags are rendered for the other articles
      expect(screen.getByText('product-vision')).toBeInTheDocument();
      expect(screen.getByText('framework')).toBeInTheDocument();
      expect(screen.getByText('present')).toBeInTheDocument();
      
      expect(screen.getByText('entrepreneurship')).toBeInTheDocument();
      expect(screen.getByText('personal-reflection')).toBeInTheDocument();
      expect(screen.getByText('history')).toBeInTheDocument();
    });
  });
});
