/**
 * Blog/Insights section type definitions
 * These types are used across the blog/insights components to ensure consistency
 */

/**
 * Base Article interface with common properties for all blog content
 */
export interface Article {
  /** Unique slug identifier for the article */
  slug: string;
  /** Article title */
  title: string;
  /** Publication date */
  date: string;
  /** Short excerpt or summary */
  excerpt?: string;
  /** Article category */
  category?: string;
  /** Author name */
  author?: string;
  /** Author title/position */
  authorTitle?: string;
  /** Author image URL */
  authorImage?: string;
  /** Estimated reading time */
  readTime?: string;
  /** Main image URL */
  image?: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Array of tags */
  tags?: string[];
  /** Whether this is a featured article */
  featured?: boolean;
}

/**
 * Extended interface for featured articles with additional properties
 */
export interface FeaturedArticle extends Article {
  /** Icon component to display with the article */
  icon?: React.ReactNode;
  /** Background color for the icon */
  iconBg?: string;
  /** Gradient colors for styling */
  gradient?: string;
  /** View count */
  views?: number;
  /** Full URL to the article */
  link?: string;
}

/**
 * Interface for blog images with responsive variants
 */
export interface BlogImage {
  /** Main image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption */
  caption?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Responsive image variants */
  responsive?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  /** Blur data URL for image loading */
  blurDataUrl?: string;
}

/**
 * Interface for blog author information
 */
export interface BlogAuthor {
  /** Author name */
  name: string;
  /** Author title/position */
  title?: string;
  /** Author image URL */
  image?: string;
  /** Author bio */
  bio?: string;
  /** Social media links */
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

/**
 * Tag with display information
 */
export interface Tag {
  /** Tag name */
  name: string;
  /** Color theme for the tag */
  color?: string;
  /** Tag category (theme, type, time) */
  category?: 'theme' | 'type' | 'time';
}

/**
 * Category with display information
 */
export interface Category {
  /** Category ID */
  id: string;
  /** Display name */
  name: string;
  /** Icon component */
  icon?: React.ReactNode;
  /** Description */
  description?: string;
}

/**
 * Tag filter structure matching the current implementation
 */
export interface TagFilterData {
  theme: string[];
  type: string[];
  time: string[];
}
