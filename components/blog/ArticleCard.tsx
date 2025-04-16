'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight, HiOutlineClock, HiOutlineTag } from 'react-icons/hi2';
import { Article, FeaturedArticle } from '@/types/blog';
import { formatDate, getTagStyles, getGradientClasses } from '@/utils/blog-styles';

export type ArticleCardVariant = 'default' | 'featured' | 'compact' | 'minimal';

export interface ArticleCardProps {
  /** Article data */
  article: Article | FeaturedArticle;
  /** Card variant */
  variant?: ArticleCardVariant;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the image */
  showImage?: boolean;
  /** Whether to show tags */
  showTags?: boolean;
  /** Whether to show the date */
  showDate?: boolean;
  /** Whether to show the reading time */
  showReadTime?: boolean;
  /** Whether to show the category */
  showCategory?: boolean;
  /** Whether to show the excerpt */
  showExcerpt?: boolean;
  /** Maximum number of tags to show */
  maxTags?: number;
  /** Custom onClick handler */
  onClick?: () => void;
}

/**
 * ArticleCard component for displaying blog articles
 * Supports multiple variants: default, featured, compact, minimal
 */
export default function ArticleCard({
  article,
  variant = 'default',
  className = '',
  showImage = true,
  showTags = true,
  showDate = true,
  showReadTime = true,
  showCategory = true,
  showExcerpt = true,
  maxTags = 3,
  onClick
}: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Determine if this is a featured article with additional properties
  const isFeaturedArticle = (article: Article | FeaturedArticle): article is FeaturedArticle => {
    return 'icon' in article || 'gradient' in article || 'iconBg' in article;
  };
  
  // Get the article link
  const articleLink = isFeaturedArticle(article) && article.link 
    ? article.link 
    : `/insights/${article.slug}`;
  
  // Get icon and gradient for featured articles
  const icon = isFeaturedArticle(article) ? article.icon : null;
  const iconBg = isFeaturedArticle(article) && article.iconBg ? article.iconBg : 'bg-blue-500';
  const gradient = isFeaturedArticle(article) && article.gradient
    ? article.gradient 
    : getGradientClasses(article.category === 'ai-collaboration' ? 'blue' : 
                         article.category === 'product-vision' ? 'purple' : 
                         article.category === 'entrepreneurship' ? 'emerald' : 'blue');
  
  // Limit tags to maxTags
  const displayTags = article.tags?.slice(0, maxTags) || [];
  const hasMoreTags = article.tags && article.tags.length > maxTags;
  
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
  
  // Render different card variants
  switch (variant) {
    case 'featured':
      return (
        <div 
          className={`group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${className}`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: isHovered 
              ? `0 10px 40px -10px rgba(${iconBg && iconBg.includes('blue') ? '59, 130, 246' : '16, 185, 129'}, 0.3)` 
              : '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          {/* Gradient background that appears on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out pointer-events-none`}
          />
          
          <div className="flex flex-col md:flex-row h-full">
            {/* Image section */}
            {showImage && article.image && (
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image 
                  src={article.image} 
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className={`${showImage && article.image ? 'md:w-1/2' : 'w-full'} p-6 md:p-8 flex flex-col h-full`}>
              {/* Date and icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  {icon && (
                    <div 
                      className={`${iconBg} bg-opacity-10 dark:bg-opacity-20 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg mr-3 transition-transform duration-300 group-hover:rotate-6 group-hover:bg-blue-500 group-hover:text-white`}
                    >
                      {icon}
                    </div>
                  )}
                  {showDate && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(article.date)}
                    </span>
                  )}
                </div>
                
                {isFeaturedArticle(article) && article.views && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{article.views}</span>
                  </div>
                )}
              </div>
              
              {/* Title */}
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-300 ${isHovered ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` : 'text-gray-900 dark:text-white'}`}>
                {article.title}
              </h3>
              
              {/* Excerpt */}
              {showExcerpt && article.excerpt && (
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {article.excerpt}
                </p>
              )}
              
              {/* Tags and metadata */}
              <div className="mt-auto">
                {/* Tags */}
                {showTags && displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {displayTags.map((tag, index) => (
                      <span 
                        key={tag} 
                        className={getTagStyles(getTagColor(tag, index), isHovered, 'featured')}
                      >
                        {tag}
                      </span>
                    ))}
                    {hasMoreTags && (
                      <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium">
                        +{article.tags!.length - maxTags} more
                      </span>
                    )}
                  </div>
                )}
                
                {/* Reading time and category */}
                <div className="flex items-center space-x-4 mb-6">
                  {showReadTime && article.readTime && (
                    <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <HiOutlineClock className="mr-1" />
                      {article.readTime}
                    </span>
                  )}
                  
                  {showCategory && article.category && (
                    <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                      {article.category}
                    </span>
                  )}
                </div>
                
                {/* Read more link */}
                <Link
                  href={articleLink}
                  className={`inline-flex items-center font-medium transition-all duration-300 ${
                    isHovered 
                      ? `text-blue-600 dark:text-blue-400` 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Read article
                  <HiArrowLongRight className={`ml-1.5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 'compact':
      return (
        <div 
          className={`group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          {/* Gradient background that appears on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 ease-out pointer-events-none`}
          />
          
          <div className="flex flex-col md:flex-row gap-4 p-4">
            {/* Image section */}
            {showImage && article.image && (
              <div className="md:w-1/4 flex-shrink-0">
                <div className="relative w-full h-32 md:h-24 rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            )}
            
            <div className={showImage && article.image ? "md:w-3/4" : "w-full"}>
              {/* Date and metadata */}
              <div className="flex flex-wrap items-center justify-between mb-2">
                {showDate && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(article.date)}
                  </span>
                )}
                
                {showReadTime && article.readTime && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <HiOutlineClock className="mr-1 w-4 h-4" />
                    {article.readTime}
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${isHovered ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` : 'text-gray-900 dark:text-white'}`}>
                {article.title}
              </h3>
              
              {/* Excerpt - truncated for compact view */}
              {showExcerpt && article.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              
              {/* Tags and category */}
              <div className="flex flex-wrap gap-2 mb-3">
                {showCategory && article.category && (
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all group-hover:bg-blue-600 group-hover:text-white inline-flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                    {article.category}
                  </span>
                )}
                
                {/* Tags - limited for compact view */}
                {showTags && displayTags.length > 0 && displayTags.slice(0, 1).map((tag, index) => (
                  <span 
                    key={tag}
                    className={getTagStyles(getTagColor(tag, index), isHovered, 'compact')}
                  >
                    <HiOutlineTag className="mr-1 w-3 h-3" />
                    {tag}
                  </span>
                ))}
                
                {hasMoreTags && (
                  <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    +{article.tags!.length - 1} more
                  </span>
                )}
              </div>
              
              {/* Read more link */}
              <Link 
                href={articleLink}
                className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center text-sm"
              >
                Read article
                <HiArrowLongRight className={`ml-1 w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Link>
            </div>
          </div>
        </div>
      );
      
    case 'minimal':
      return (
        <div 
          className={`group hover-lift transition-all duration-300 ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          <div className="flex items-start gap-3">
            {/* Minimal indicator */}
            <span className="text-gray-400 dark:text-gray-500 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">→</span>
            
            <div className="flex-1">
              {/* Title only */}
              <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link href={articleLink}>
                  {article.title}
                </Link>
              </h3>
              
              {/* Optional date in small text */}
              {showDate && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(article.date, 'MMM d, yyyy')}
                </p>
              )}
            </div>
          </div>
        </div>
      );
      
    // Default card style
    default:
      return (
        <div 
          className={`group mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-800/30 relative overflow-hidden transform hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
          <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="absolute -left-16 -top-16 w-32 h-32 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out delay-100"></div>
          
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Image section */}
            {showImage && article.image && (
              <div className="md:w-1/4 flex-shrink-0">
                <div className="relative w-full h-40 md:h-32 rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            )}
            
            <div className={article.image ? "md:w-3/4" : "w-full"}>
              {/* Date and metadata */}
              <div className="flex flex-wrap items-center justify-between mb-2">
                {showDate && (
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(article.date)}
                    </span>
                    
                    {showReadTime && article.readTime && (
                      <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <HiOutlineClock className="mr-1 w-4 h-4" />
                        {article.readTime}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {/* Category pill */}
                  {showCategory && article.category && (
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-blue-600 group-hover:text-white inline-flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                      {article.category}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {article.title}
              </h3>
              
              {/* Excerpt */}
              {showExcerpt && article.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              
              {/* Tags */}
              {showTags && displayTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {displayTags.map((tag, index) => (
                    <Link 
                      key={tag}
                      href={`/insights/tag/${encodeURIComponent(tag)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Allow the link to work normally
                      }}
                      className={getTagStyles(getTagColor(tag, index), isHovered, 'default')}
                    >
                      <HiOutlineTag className="mr-1 w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                  
                  {/* Show +X more if there are more tags */}
                  {hasMoreTags && (
                    <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium">
                      +{article.tags!.length - maxTags} more
                    </span>
                  )}
                </div>
              )}
              
              {/* Read more link */}
              <div className="flex items-center">
                <Link href={articleLink}>
                  <span
                    className="text-blue-600 dark:text-blue-400 group-hover:font-medium inline-flex items-center"
                  >
                    Read article
                    <HiArrowLongRight className="transition-transform group-hover:translate-x-1 ml-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
