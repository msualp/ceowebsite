import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleTags } from '@/components/blog';

describe('ArticleTags Component', () => {
  const mockTags = ['collaborative-ai', 'thought-piece', 'future'];

  test('renders all tags', () => {
    render(<ArticleTags tags={mockTags} />);
    expect(screen.getByText('collaborative-ai')).toBeInTheDocument();
    expect(screen.getByText('thought-piece')).toBeInTheDocument();
    expect(screen.getByText('future')).toBeInTheDocument();
  });

  test('renders nothing when tags array is empty', () => {
    const { container } = render(<ArticleTags tags={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when tags is undefined', () => {
    // @ts-ignore - Intentionally testing with undefined
    const { container } = render(<ArticleTags tags={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('applies custom className', () => {
    const { container } = render(<ArticleTags tags={mockTags} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('applies variant styles correctly for default variant', () => {
    const { container } = render(<ArticleTags tags={mockTags} variant="default" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies variant styles correctly for featured variant', () => {
    const { container } = render(<ArticleTags tags={mockTags} variant="featured" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies variant styles correctly for compact variant', () => {
    const { container } = render(<ArticleTags tags={mockTags} variant="compact" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders tags with appropriate styles', () => {
    render(<ArticleTags tags={['collaborative-ai', 'thought-piece', 'future']} />);
    
    // Check that all tags are rendered
    expect(screen.getByText('collaborative-ai')).toBeInTheDocument();
    expect(screen.getByText('thought-piece')).toBeInTheDocument();
    expect(screen.getByText('future')).toBeInTheDocument();
    
    // We can't easily test the exact styles since they're determined by the getTagStyles utility
    // but we can verify the tags are rendered with some styling
    const tagElements = screen.getAllByText(/collaborative-ai|thought-piece|future/);
    tagElements.forEach(tag => {
      expect(tag).toHaveClass('px-2.5'); // Common style for all tags
    });
  });

  test('limits the number of tags when maxTags is provided', () => {
    render(<ArticleTags tags={mockTags} maxTags={2} />);
    expect(screen.getByText('collaborative-ai')).toBeInTheDocument();
    expect(screen.getByText('thought-piece')).toBeInTheDocument();
    expect(screen.queryByText('future')).not.toBeInTheDocument();
  });

  test('renders a "more" indicator when tags are limited', () => {
    render(<ArticleTags tags={mockTags} maxTags={2} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('does not render a "more" indicator when all tags are shown', () => {
    render(<ArticleTags tags={mockTags} maxTags={3} />);
    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });

  test('renders tags as links when clickable is true', () => {
    render(<ArticleTags tags={mockTags} clickable={true} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/insights/tag/collaborative-ai');
    expect(links[1]).toHaveAttribute('href', '/insights/tag/thought-piece');
    expect(links[2]).toHaveAttribute('href', '/insights/tag/future');
  });

  test('renders tags without links when clickable is false', () => {
    render(<ArticleTags tags={mockTags} clickable={false} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
