'use client';

import { useState } from 'react';
import { HiOutlineTag, HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import { TagFilterData } from '@/types/blog';
import { getTagStyles } from '@/utils/blog-styles';

export interface TagFilterProps {
  /** Tag data organized by category */
  tags: TagFilterData;
  /** Handler for tag selection */
  onTagSelect: (tag: string) => void;
  /** Currently selected tag */
  selectedTag?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the clear filter button */
  showClearFilter?: boolean;
  /** Base path for tag links */
  tagLinkPath?: string;
  /** Whether to update the URL when a tag is selected */
  updateUrl?: boolean;
  /** URL parameter name for the tag */
  urlParamName?: string;
}

/**
 * TagFilter component for filtering content by tags
 * Organized into categories: theme, type, time
 */
export default function TagFilter({
  tags,
  onTagSelect,
  selectedTag = '',
  className = '',
  showClearFilter = true,
  tagLinkPath = '/insights/tag',
  updateUrl = false,
  urlParamName = 'tag'
}: TagFilterProps) {
  const [activeCategory, setActiveCategory] = useState<'theme' | 'type' | 'time'>('theme');
  
  // Get the tags for the active category
  const activeTags = tags[activeCategory] || [];
  
  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    onTagSelect(tag);
    
    // Update URL if enabled
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (tag) {
        url.searchParams.set(urlParamName, tag);
      } else {
        url.searchParams.delete(urlParamName);
      }
      window.history.pushState({}, '', url);
    }
  };
  
  // Get tag color based on category
  const getTagColor = (tag: string, category: 'theme' | 'type' | 'time'): string => {
    // Theme-based colors
    if (category === 'theme') {
      if (tag.includes('ai') || tag.includes('intelligence')) return 'blue';
      if (tag.includes('product') || tag.includes('design')) return 'purple';
      if (tag.includes('entrepreneur') || tag.includes('startup')) return 'emerald';
      if (tag.includes('future') || tag.includes('trend')) return 'teal';
      if (tag.includes('technical') || tag.includes('code')) return 'indigo';
      if (tag.includes('leadership') || tag.includes('management')) return 'amber';
      return 'blue';
    }
    
    // Type-based colors
    if (category === 'type') {
      if (tag.includes('reflection') || tag.includes('thought')) return 'purple';
      if (tag.includes('framework') || tag.includes('how-it-works')) return 'emerald';
      if (tag.includes('analysis') || tag.includes('insight')) return 'blue';
      if (tag.includes('visionary') || tag.includes('satire')) return 'amber';
      return 'indigo';
    }
    
    // Time-based colors
    if (category === 'time') {
      if (tag === 'present') return 'blue';
      if (tag === 'future') return 'purple';
      if (tag === 'history' || tag === 'retrospective') return 'amber';
      return 'teal';
    }
    
    return 'blue';
  };
  
  return (
    <div className={`mac-glass p-4 rounded-xl mb-6 border border-gray-100 dark:border-gray-800/40 ${className}`}>
      {/* Category tabs */}
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveCategory('theme')}
          className={`px-4 py-2 text-sm font-medium ${
            activeCategory === 'theme'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
          aria-selected={activeCategory === 'theme'}
          role="tab"
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
          aria-selected={activeCategory === 'type'}
          role="tab"
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
          aria-selected={activeCategory === 'time'}
          role="tab"
        >
          Timeline
        </button>
      </div>
      
      {/* Tag list */}
      <div className="flex flex-wrap gap-2" role="tabpanel">
        {activeTags.map((tag) => (
          <Link
            key={tag}
            href={`${tagLinkPath}/${encodeURIComponent(tag)}`}
            className={getTagStyles(
              getTagColor(tag, activeCategory),
              selectedTag === tag,
              'default'
            )}
            onClick={(e) => {
              e.preventDefault();
              handleTagSelect(tag);
            }}
            aria-pressed={selectedTag === tag}
          >
            <HiOutlineTag className="mr-1 w-3 h-3" />
            {tag}
          </Link>
        ))}
        
        {/* Clear filter button */}
        {selectedTag && showClearFilter && (
          <button
            onClick={() => handleTagSelect('')}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70"
            aria-label="Clear filter"
          >
            <HiXMark className="mr-1 w-3 h-3" />
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * TagFilterWithUrl component for filtering content by tags with URL integration
 * This is a higher-order component that adds URL integration to the TagFilter
 */
export function TagFilterWithUrl({
  tags,
  selectedTag,
  urlParamName = 'tag',
  ...props
}: Omit<TagFilterProps, 'onTagSelect' | 'updateUrl'>) {
  // Handle tag selection with URL update
  const handleTagSelect = (tag: string) => {
    // Update URL
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set(urlParamName, tag);
    } else {
      url.searchParams.delete(urlParamName);
    }
    window.history.pushState({}, '', url);
    
    // Dispatch a custom event that page components can listen for
    window.dispatchEvent(new CustomEvent('tagChange', { detail: { tag } }));
  };
  
  return (
    <TagFilter
      tags={tags}
      onTagSelect={handleTagSelect}
      selectedTag={selectedTag}
      updateUrl={false} // We handle URL updates manually
      {...props}
    />
  );
}
