'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlineTag } from 'react-icons/hi2';
import { getTagStyles } from '@/utils/blog-styles';

export interface ArticleTagsProps {
  /** Array of tags */
  tags: string[];
  /** Whether the parent element is hovered */
  isHovered?: boolean;
  /** Style variant */
  variant?: 'default' | 'featured' | 'compact' | 'hero';
  /** Maximum number of tags to display */
  maxTags?: number;
  /** Whether to show a count of additional tags */
  showMoreCount?: boolean;
  /** Whether to make tags clickable */
  clickable?: boolean;
  /** Base path for tag links */
  tagLinkPath?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom onClick handler for tags */
  onTagClick?: (tag: string) => void;
}

/**
 * ArticleTags component for displaying article tags consistently
 */
export default function ArticleTags({
  tags,
  isHovered = false,
  variant = 'default',
  maxTags = 3,
  showMoreCount = true,
  clickable = true,
  tagLinkPath = '/insights/tag',
  className = '',
  onTagClick
}: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null;
  
  // Limit tags to maxTags
  const displayTags = tags.slice(0, maxTags);
  const hasMoreTags = tags.length > maxTags;
  
  // Get tag colors based on category or predefined values
  const getTagColor = (tag: string, index: number): string => {
    const defaultColors = ['blue', 'indigo', 'purple', 'emerald', 'teal', 'amber'];
    
    // Map categories to colors
    if (tag.includes('ai') || tag.includes('intelligence')) return 'blue';
    if (tag.includes('product') || tag.includes('design')) return 'purple';
    if (tag.includes('entrepreneur') || tag.includes('startup')) return 'emerald';
    if (tag.includes('future') || tag.includes('trend')) return 'teal';
    if (tag.includes('technical') || tag.includes('code')) return 'indigo';
    if (tag.includes('leadership') || tag.includes('management')) return 'amber';
    
    // Fallback to default colors based on index
    return defaultColors[index % defaultColors.length];
  };
  
  // Render tag
  const renderTag = (tag: string, index: number) => {
    const tagColor = getTagColor(tag, index);
    const tagClasses = getTagStyles(tagColor, isHovered, variant);
    
    // If clickable, render as a link
    if (clickable) {
      return (
        <Link 
          key={tag}
          href={`${tagLinkPath}/${encodeURIComponent(tag)}`}
          onClick={(e) => {
            if (onTagClick) {
              e.preventDefault();
              onTagClick(tag);
            }
          }}
          className={tagClasses}
        >
          <HiOutlineTag className="mr-1 w-3 h-3" />
          {tag}
        </Link>
      );
    }
    
    // Otherwise, render as a span
    return (
      <span 
        key={tag}
        className={tagClasses}
      >
        <HiOutlineTag className="mr-1 w-3 h-3" />
        {tag}
      </span>
    );
  };
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, index) => renderTag(tag, index))}
      
      {/* Show +X more if there are more tags */}
      {hasMoreTags && showMoreCount && (
        <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium">
          +{tags.length - maxTags} more
        </span>
      )}
    </div>
  );
}
