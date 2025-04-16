'use client';

import Link from 'next/link';
import { HiOutlineTag } from 'react-icons/hi2';

interface InsightCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  className?: string;
  tags?: string[];
}

export default function InsightCard({
  title,
  date,
  excerpt,
  slug,
  className = '',
  tags = []
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
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <HiOutlineTag className="mr-1 w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <Link 
        href={`/insights/${slug}`} 
        className="text-blue-600 hover:underline icon-hover inline-flex items-center"
      >
        Read More →
      </Link>
    </div>
  );
}
