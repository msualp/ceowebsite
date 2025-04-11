'use client';

import Link from 'next/link';

interface InsightCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  className?: string;
}

export default function InsightCard({
  title,
  date,
  excerpt,
  slug,
  className = ''
}: InsightCardProps) {
  return (
    <div className={`hover-lift mac-glass p-6 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold mb-2">
        <Link href={`/insights/${slug}`} className="text-blue-600 hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{excerpt}</p>
      <Link 
        href={`/insights/${slug}`} 
        className="text-blue-600 hover:underline icon-hover inline-flex items-center"
      >
        Read More →
      </Link>
    </div>
  );
}
