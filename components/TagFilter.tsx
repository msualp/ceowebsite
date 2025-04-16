'use client';

import { useState, useEffect } from 'react';
import { HiOutlineTag } from 'react-icons/hi2';
import Link from 'next/link';

interface TagFilterProps {
  tags: {
    theme: string[];
    type: string[];
    time: string[];
  };
  onTagSelect: (tag: string) => void;
  selectedTag?: string;
}

export default function TagFilter({ tags, onTagSelect, selectedTag }: TagFilterProps) {
  const [activeCategory, setActiveCategory] = useState<'theme' | 'type' | 'time'>('theme');
  
  // Get the tags for the active category
  const activeTags = tags[activeCategory] || [];
  
  return (
    <div className="mac-glass p-4 rounded-xl mb-6 border border-gray-100 dark:border-gray-800/40">
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveCategory('theme')}
          className={`px-4 py-2 text-sm font-medium ${
            activeCategory === 'theme'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Themes
        </button>
        <button
          onClick={() => setActiveCategory('type')}
          className={`px-4 py-2 text-sm font-medium ${
            activeCategory === 'type'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Types
        </button>
        <button
          onClick={() => setActiveCategory('time')}
          className={`px-4 py-2 text-sm font-medium ${
            activeCategory === 'time'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Timeline
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeTags.map((tag) => (
          <Link
            key={tag}
            href={`/insights/tag/${encodeURIComponent(tag)}`}
            className={`
              inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${
                selectedTag === tag
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'
              }
            `}
            onClick={(e) => {
              e.preventDefault();
              onTagSelect(tag);
            }}
          >
            <HiOutlineTag className="mr-1 w-3 h-3" />
            {tag}
          </Link>
        ))}
        
        {selectedTag && (
          <button
            onClick={() => onTagSelect('')}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
}
