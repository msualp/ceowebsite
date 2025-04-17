/**
 * Blog SEO utility functions
 * These functions help generate SEO metadata for blog content
 */

import { Article } from '@/types/blog';

/**
 * Generate meta description from article excerpt or content
 * 
 * @param article - The article to generate meta description for
 * @param maxLength - Maximum length of the meta description (default: 160)
 * @returns Meta description string
 */
export function generateMetaDescription(article: Article, maxLength: number = 160): string {
  if (!article) return '';
  
  // Use excerpt if available
  if (article.excerpt) {
    return truncateText(article.excerpt, maxLength);
  }
  
  // Otherwise, return a default description
  return `Read "${article.title}" by ${article.author || 'Mustafa Sualp'} - Insights on AI, leadership, and innovation.`;
}

/**
 * Generate canonical URL for an article
 * 
 * @param article - The article to generate canonical URL for
 * @param baseUrl - Base URL of the website (default: 'https://mustafasualp.com')
 * @returns Canonical URL string
 */
export function generateCanonicalUrl(article: Article, baseUrl: string = 'https://mustafasualp.com'): string {
  if (!article || !article.slug) return baseUrl;
  
  return `${baseUrl}/insights/${article.slug}`;
}

/**
 * Generate Open Graph metadata for an article
 * 
 * @param article - The article to generate Open Graph metadata for
 * @param baseUrl - Base URL of the website (default: 'https://mustafasualp.com')
 * @returns Open Graph metadata object
 */
export function generateOpenGraph(article: Article, baseUrl: string = 'https://mustafasualp.com'): {
  title: string;
  description: string;
  url: string;
  type: string;
  images: { url: string; width?: number; height?: number; alt?: string }[];
  siteName: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
} {
  if (!article) {
    return {
      title: 'Mustafa Sualp - Insights',
      description: 'Thoughts on AI, leadership, and innovation',
      url: `${baseUrl}/insights`,
      type: 'website',
      images: [{ url: `${baseUrl}/images/og-default.jpg` }],
      siteName: 'Mustafa Sualp'
    };
  }
  
  return {
    title: article.title,
    description: generateMetaDescription(article),
    url: generateCanonicalUrl(article, baseUrl),
    type: 'article',
    images: [
      {
        url: article.image ? (article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`) : `${baseUrl}/images/og-default.jpg`,
        alt: article.imageAlt || article.title
      }
    ],
    siteName: 'Mustafa Sualp',
    publishedTime: article.date,
    authors: article.author ? [article.author] : ['Mustafa Sualp'],
    tags: article.tags
  };
}

/**
 * Generate Twitter card metadata for an article
 * 
 * @param article - The article to generate Twitter card metadata for
 * @param baseUrl - Base URL of the website (default: 'https://mustafasualp.com')
 * @returns Twitter card metadata object
 */
export function generateTwitterCard(article: Article, baseUrl: string = 'https://mustafasualp.com'): {
  card: 'summary' | 'summary_large_image';
  site: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
} {
  if (!article) {
    return {
      card: 'summary',
      site: '@mustafasualp',
      title: 'Mustafa Sualp - Insights',
      description: 'Thoughts on AI, leadership, and innovation'
    };
  }
  
  const hasLargeImage = article.image ? true : false;
  
  return {
    card: hasLargeImage ? 'summary_large_image' : 'summary',
    site: '@mustafasualp',
    title: article.title,
    description: generateMetaDescription(article, 200),
    image: article.image ? (article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`) : undefined,
    imageAlt: article.imageAlt || article.title
  };
}

/**
 * Generate JSON-LD structured data for an article
 * 
 * @param article - The article to generate structured data for
 * @param baseUrl - Base URL of the website (default: 'https://mustafasualp.com')
 * @returns JSON-LD structured data object
 */
export function generateJsonLd(article: Article, baseUrl: string = 'https://mustafasualp.com'): object {
  if (!article) return {};
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.image ? (article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`) : undefined,
    'datePublished': article.date,
    'author': {
      '@type': 'Person',
      'name': article.author || 'Mustafa Sualp',
      'url': `${baseUrl}/about`
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Mustafa Sualp',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': generateCanonicalUrl(article, baseUrl)
    },
    'keywords': article.tags?.join(', ')
  };
}

/**
 * Truncate text to a specified length
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 160)
 * @returns Truncated text
 */
function truncateText(text: string, maxLength: number = 160): string {
  if (!text || text.length <= maxLength) return text;
  
  // Truncate at the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace === -1) return truncated + '...';
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate a slug from a title
 * 
 * @param title - Title to generate slug from
 * @returns Slug string
 */
export function generateSlug(title: string): string {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Generate a complete set of SEO metadata for an article
 * 
 * @param article - The article to generate SEO metadata for
 * @param baseUrl - Base URL of the website (default: 'https://mustafasualp.com')
 * @returns Complete SEO metadata object
 */
export function generateSeoMetadata(article: Article, baseUrl: string = 'https://mustafasualp.com'): {
  title: string;
  description: string;
  canonical: string;
  openGraph: ReturnType<typeof generateOpenGraph>;
  twitter: ReturnType<typeof generateTwitterCard>;
  jsonLd: object;
} {
  return {
    title: article.title,
    description: generateMetaDescription(article),
    canonical: generateCanonicalUrl(article, baseUrl),
    openGraph: generateOpenGraph(article, baseUrl),
    twitter: generateTwitterCard(article, baseUrl),
    jsonLd: generateJsonLd(article, baseUrl)
  };
}
