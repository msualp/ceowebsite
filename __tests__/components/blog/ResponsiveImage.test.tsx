import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResponsiveImage } from '@/components/blog';
import { BlogImage } from '@/types/blog';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ResponsiveImage Component', () => {
  const mockImageUrl = '/images/test-image.jpg';
  const mockAltText = 'Test image alt text';
  const mockCaption = 'Test image caption';
  
  const mockBlogImage: BlogImage = {
    url: '/images/blog-image.jpg',
    alt: 'Blog image alt text',
    caption: 'Blog image caption',
    responsive: {
      small: '/images/blog-image-small.jpg',
      medium: '/images/blog-image-medium.jpg',
      large: '/images/blog-image-large.jpg',
    },
    blurDataUrl: 'data:image/jpeg;base64,someblurdata',
  };

  test('renders an image with string src', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImageUrl);
    expect(image).toHaveAttribute('alt', mockAltText);
  });

  test('renders an image with BlogImage src', () => {
    render(<ResponsiveImage src={mockBlogImage} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockBlogImage.url);
    expect(image).toHaveAttribute('alt', mockBlogImage.alt);
  });

  test('renders with caption when provided', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} caption={mockCaption} />);
    expect(screen.getByText(mockCaption)).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <ResponsiveImage src={mockImageUrl} alt={mockAltText} className="custom-class" />
    );
    const imageContainer = container.firstChild;
    const image = screen.getByRole('img');
    expect(image).toHaveClass('custom-class');
  });

  test('uses default width and height when not provided', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '450');
  });

  test('uses provided width and height', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} width={400} height={300} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '300');
  });

  test('uses fill mode when fill is true', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} fill={true} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('fill', 'true');
    expect(image).not.toHaveAttribute('width');
    expect(image).not.toHaveAttribute('height');
  });

  test('applies priority attribute when priority is true', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} priority={true} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('priority', 'true');
  });

  test('applies blur placeholder when available', () => {
    render(<ResponsiveImage src={mockBlogImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('placeholder', 'blur');
    expect(image).toHaveAttribute('blurDataURL', mockBlogImage.blurDataUrl);
  });

  test('applies object-fit style', () => {
    render(<ResponsiveImage src={mockImageUrl} alt={mockAltText} objectFit="contain" />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass('object-contain');
  });
});
