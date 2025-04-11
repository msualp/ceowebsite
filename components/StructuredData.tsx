'use client';

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'Article' | 'WebSite' | 'WebPage';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  // Create the JSON-LD structured data based on the type
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    return JSON.stringify(baseData);
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: getStructuredData() }}
    />
  );
}
