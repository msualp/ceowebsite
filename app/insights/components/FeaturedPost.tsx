'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight, HiOutlineClock, HiOutlineStar } from 'react-icons/hi2';
import Button from '@/components/Button';
import { Article } from '@/types/blog';
import { formatDate } from '@/utils/blog-styles';

interface FeaturedPostProps {
  /** The featured post to display */
  post: Article;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * FeaturedPost component for displaying a featured article in a hero layout
 */
export default function FeaturedPost({ post, className = '' }: FeaturedPostProps) {
  // Use the provided formatDate function or fallback to local implementation
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

  if (!post) return null;

  return (
    <div className={`relative mb-16 fade-in-reveal ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
      <div className="relative mac-glass border border-blue-100 dark:border-blue-900/20 rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 blur-2xl rounded-full"></div>
        </div>
        
        <div className="relative flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full mr-2 inline-flex items-center">
                <HiOutlineStar className="mr-1" />
                Featured
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {formatPostDate(post.date)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="mt-auto flex items-center space-x-4">
              <Link href={`/insights/${post.slug}`}>
                <Button 
                  variant="primary"
                  size="lg"
                  icon={<HiArrowLongRight />}
                  className="transition-transform hover:translate-x-1"
                >
                  Read Article
                </Button>
              </Link>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center mr-4">
                  <HiOutlineClock className="mr-1" />
                  {post.readTime || '5 min read'}
                </span>
                
                {post.category && (
                  <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={post.image || "/images/default-cover.jpg"}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-gray-900/80 to-transparent md:bg-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
