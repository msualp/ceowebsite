'use client';

import { usePathname } from 'next/navigation';
import StructuredData from './StructuredData';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export default function SEO({
  title = 'Mustafa Sualp - CEO & Founder of Sociail',
  description = 'Mustafa Sualp is a serial entrepreneur and technology executive with a proven track record of building and scaling software companies.',
  type = 'website',
  image = '/images/Mustafa-Sualp-Sociail.png',
  publishedAt,
  updatedAt,
}: SEOProps) {
  const pathname = usePathname();
  const url = `https://sualp.com${pathname}`;
  
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
    headline: title,
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
    name: title,
    description,
    isPartOf: {
      '@id': 'https://sualp.com/#website'
    }
  };
  
  return (
    <>
      <StructuredData type="WebSite" data={websiteData} />
      <StructuredData type="Person" data={personData} />
      <StructuredData type="Organization" data={organizationData} />
      <StructuredData type="WebPage" data={pageData} />
      {type === 'article' && articleData && (
        <StructuredData type="Article" data={articleData} />
      )}
    </>
  );
}
