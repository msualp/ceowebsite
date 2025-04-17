'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowLongRight, HiOutlineClock, HiOutlineTag } from 'react-icons/hi2';
import Button from '@/components/Button';
import { Article } from '@/types/blog';
import { formatDate } from '@/utils/blog-styles';
import { ArticleCard, Pagination } from '@/components/blog';
import { useSearchParams } from 'next/navigation';

interface PostsListProps {
  /** Array of posts to display */
  posts: Article[];
  /** Whether the posts are loading */
  loading?: boolean;
  /** Message to display when there are no posts */
  emptyMessage?: string;
  /** Action to display when there are no posts */
  emptyAction?: React.ReactNode;
  /** Handler for category change */
  onCategoryChange?: (category: string) => void;
  /** Optional additional CSS classes */
  className?: string;
  /** Number of posts per page */
  postsPerPage?: number;
  /** Base URL for pagination */
  baseUrl?: string;
}

/**
 * PostsList component for displaying a list of blog posts
 */
export default function PostsList({
  posts,
  loading = false,
  emptyMessage = 'No articles found',
  emptyAction,
  onCategoryChange,
  className = '',
  postsPerPage = 5,
  baseUrl = '/insights'
}: PostsListProps) {
  // Get search params for pagination
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Update current page when URL changes
  useEffect(() => {
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);
  
  // Calculate pagination
  const totalPosts = posts.length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Format date function
  const formatPostDate = (dateString: string) => {
    if (typeof formatDate === 'function') {
      return formatDate(dateString);
    }
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading insights...</p>
      </div>
    );
  }

  // Empty state
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 mac-glass p-8 rounded-xl">
        <div className="flex justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">No insights found for this category.</p>
        {emptyAction || (
          <Button 
            onClick={() => onCategoryChange && onCategoryChange('all')}
            variant="outline"
            size="sm"
          >
            View all articles
          </Button>
        )}
      </div>
    );
  }

  // Use the shared ArticleCard component if available
  if (typeof ArticleCard === 'function') {
    return (
      <div className={className}>
        <div className="space-y-6 stagger-fade-in visible">
          {currentPosts.map((post) => (
            <ArticleCard
              key={post.slug}
              article={post}
              variant="default"
              showImage={true}
              showTags={true}
              showDate={true}
              showReadTime={true}
              showCategory={true}
              showExcerpt={true}
              maxTags={2}
            />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPosts > postsPerPage && (
          <Pagination
            totalItems={totalPosts}
            itemsPerPage={postsPerPage}
            currentPage={currentPage}
            baseUrl={baseUrl}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    );
  }

  // Fallback to custom implementation if ArticleCard is not available
  return (
    <div className={className}>
      <div className="space-y-6 stagger-fade-in visible">
        {currentPosts.map((post) => (
          <div 
            key={post.slug}
            className="group mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-800/30 relative overflow-hidden transform hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out delay-100"></div>
            
            <div className="flex flex-col md:flex-row gap-6 relative">
              {post.image && (
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="relative w-full h-40 md:h-32 rounded-lg overflow-hidden">
                    <Image
                      src={post.image || "/images/default-cover.jpg"}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
              )}
              
              <div className={post.image ? "md:w-3/4" : "w-full"}>
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatPostDate(post.date)}
                    </span>
                    
                    {post.readTime && (
                      <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <HiOutlineClock className="mr-1 w-4 h-4" />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Category pill */}
                    {post.category && (
                      <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-blue-600 group-hover:text-white inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                        {post.category}
                      </span>
                    )}
                    
                    {/* Tags display (limited to 2 for space) */}
                    {post.tags && post.tags.slice(0, 2).map((tag: string) => (
                      <Link 
                        key={tag}
                        href={`/insights/tag/${encodeURIComponent(tag)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Allow the link to work normally
                        }}
                        className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 inline-flex items-center cursor-pointer"
                      >
                        <HiOutlineTag className="mr-1 w-3 h-3" />
                        {tag}
                      </Link>
                    ))}
                    
                    {/* Show +X more if there are more tags */}
                    {post.tags && post.tags.length > 2 && (
                      <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center">
                  <Link href={`/insights/${post.slug}`}>
                    <Button
                      variant="text"
                      size="sm"
                      icon={<HiArrowLongRight className="transition-transform group-hover:translate-x-1" />}
                      className="text-blue-600 dark:text-blue-400 group-hover:font-medium"
                    >
                      Read article
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPosts > postsPerPage && (
        <Pagination
          totalItems={totalPosts}
          itemsPerPage={postsPerPage}
          currentPage={currentPage}
          baseUrl={baseUrl}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}
