import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollaborativeAIPage from '@/app/collaborative-ai/page-modular';

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

// Mock the IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock articles data for ThoughtLeadership component
jest.mock('@/app/insights/getInsights', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve([
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
      category: 'ai-collaboration',
      author: 'Test Author',
      authorTitle: 'Test Author Title',
      readTime: '3 min read',
      image: '/images/test-image-2.jpg',
      imageAlt: 'Test image alt text 2',
      tags: ['collaborative-ai', 'framework', 'present'],
      featured: false,
    },
  ])),
}));

describe('CollaborativeAIPage Integration', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the hero section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the hero section is rendered
    expect(screen.getByText('Collaborative AI')).toBeInTheDocument();
    expect(screen.getByText(/Pioneering the next frontier/)).toBeInTheDocument();
  });

  test('renders the definition section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the definition section is rendered
    expect(screen.getByText('What is Collaborative AI?')).toBeInTheDocument();
    expect(screen.getByText(/represents a fundamental shift/)).toBeInTheDocument();
  });

  test('renders the vision section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the vision section is rendered
    expect(screen.getByText('Our Vision for Collaborative AI')).toBeInTheDocument();
    expect(screen.getByText(/We envision a future/)).toBeInTheDocument();
  });

  test('renders the research topics section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the research topics section is rendered
    expect(screen.getByText('Research Topics')).toBeInTheDocument();
  });

  test('renders the thought leadership section with articles', async () => {
    render(<CollaborativeAIPage />);
    
    // Wait for the articles to load
    await waitFor(() => {
      // Check if the thought leadership section is rendered
      expect(screen.getByText('Thought Leadership')).toBeInTheDocument();
      
      // Check if the articles are rendered
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });
  });

  test('renders the FAQ section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the FAQ section is rendered
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  test('renders the collaboration section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the collaboration section is rendered
    expect(screen.getByText('Collaborate With Us')).toBeInTheDocument();
  });

  test('renders the newsletter section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the newsletter section is rendered
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText(/Subscribe to our newsletter/)).toBeInTheDocument();
  });

  test('renders the call to action section', async () => {
    render(<CollaborativeAIPage />);
    
    // Check if the call to action section is rendered
    expect(screen.getByText('Ready to Explore the Future of Collaboration?')).toBeInTheDocument();
    expect(screen.getByText(/Connect with us to discuss/)).toBeInTheDocument();
  });

  test('all sections are present in the correct order', async () => {
    render(<CollaborativeAIPage />);
    
    // Get all section headings
    const headings = screen.getAllByRole('heading', { level: 2 });
    
    // Check if the headings are in the correct order
    expect(headings[0].textContent).toContain('Collaborative AI');
    expect(headings[1].textContent).toContain('What is Collaborative AI?');
    expect(headings[2].textContent).toContain('Our Vision for Collaborative AI');
    expect(headings[3].textContent).toContain('Research Topics');
    expect(headings[4].textContent).toContain('Thought Leadership');
    expect(headings[5].textContent).toContain('Frequently Asked Questions');
    expect(headings[6].textContent).toContain('Collaborate With Us');
    expect(headings[7].textContent).toContain('Stay Updated');
    expect(headings[8].textContent).toContain('Ready to Explore');
  });
});
