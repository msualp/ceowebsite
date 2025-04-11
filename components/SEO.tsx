'use client';

import { usePathname } from 'next/navigation';
import LazyStructuredData from './lazy/LazyStructuredData';
import { getPageMetaData } from '@/lib/meta-descriptions';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export default function SEO({
  title,
  description,
  type = 'website',
  image = '/images/Mustafa-Sualp-Sociail.png',
  publishedAt,
  updatedAt,
}: SEOProps) {
  const pathname = usePathname();
  const url = `https://sualp.com${pathname}`;
  
  // Get page-specific meta data if not provided
  const pageMetaData = getPageMetaData(pathname);
  const finalTitle = title || pageMetaData.title;
  const finalDescription = description || pageMetaData.description;
  
  // Base website structured data
  const websiteData = {
    name: 'Mustafa Sualp',
    url: 'https://sualp.com',
    description: 'Personal website of Mustafa Sualp, CEO & Founder of Sociail',
    potentialAction: {
      '@type': 'SearchAction',
      'target': 'https://sualp.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  
  // Person structured data
  const personData = {
    name: 'Mustafa Sualp',
    url: 'https://sualp.com',
    image: 'https://sualp.com/images/Mustafa-Sualp-Sociail.png',
    sameAs: [
      'https://www.linkedin.com/in/sualp/',
      'https://github.com/msualp',
      'https://x.com/msualp_sociail'
    ],
    jobTitle: 'CEO & Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Sociail, Inc.',
      url: 'https://sociail.com'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Drexel University',
      url: 'https://drexel.edu'
    }
  };
  
  // Organization structured data
  const organizationData = {
    name: 'Sociail, Inc.',
    url: 'https://sociail.com',
    logo: 'https://sualp.com/images/sociail-logo-with-gray-stroke.svg',
    description: 'Sociail is a real-time collaborative AI platform that fundamentally redefines how modern teams create, decide, and deliver.',
    founder: {
      '@type': 'Person',
      name: 'Mustafa Sualp',
      url: 'https://sualp.com'
    }
  };
  
  // Article structured data (for blog posts)
  const articleData = publishedAt ? {
    headline: finalTitle,
    image: `https://sualp.com${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: 'Mustafa Sualp',
      url: 'https://sualp.com'
    },
    publisher: {
      '@type': 'Person',
      name: 'Mustafa Sualp',
      url: 'https://sualp.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  } : null;
  
  // Current page structured data
  const pageData = {
    '@id': url,
    url,
    name: finalTitle,
    description: finalDescription,
    isPartOf: {
      '@id': 'https://sualp.com/#website'
    }
  };
  
  return (
    <>
      <LazyStructuredData type="WebSite" data={websiteData} />
      <LazyStructuredData type="Person" data={personData} />
      <LazyStructuredData type="Organization" data={organizationData} />
      <LazyStructuredData type="WebPage" data={pageData} />
      {type === 'article' && articleData && (
        <LazyStructuredData type="Article" data={articleData} />
      )}
    </>
  );
}
