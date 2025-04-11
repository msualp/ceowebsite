'use client';

import SEO from './SEO';

interface ClientSEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export default function ClientSEO(props: ClientSEOProps) {
  return <SEO {...props} />;
}
