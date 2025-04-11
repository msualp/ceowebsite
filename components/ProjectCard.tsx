'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface Tag {
  label: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: Tag[];
  link?: {
    href: string;
    label: string;
    external?: boolean;
  };
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  className = ''
}: ProjectCardProps) {
  return (
    <div className={`hover-lift mac-glass p-6 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {description}
      </p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-2 py-1 ${tag.color} text-xs rounded-full`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
      
      {link && (
        link.external ? (
          <a 
            href={link.href} 
            className="text-blue-600 dark:text-blue-400 hover:underline icon-hover inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} →
          </a>
        ) : (
          <Link 
            href={link.href} 
            className="text-blue-600 dark:text-blue-400 hover:underline icon-hover inline-flex items-center"
          >
            {link.label} →
          </Link>
        )
      )}
    </div>
  );
}
