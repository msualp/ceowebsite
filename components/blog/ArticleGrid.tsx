'use client';

import React from 'react';
import { Article, FeaturedArticle } from '@/types/blog';
import ArticleCard, { ArticleCardVariant } from './ArticleCard';

export interface ArticleGridProps {
  /** Array of articles to display */
  articles: (Article | FeaturedArticle)[];
  /** Number of columns on desktop */
  columns?: 1 | 2 | 3 | 4;
  /** Card variant to use */
  cardVariant?: ArticleCardVariant;
  /** Whether to show images */
  showImages?: boolean;
  /** Whether to show tags */
  showTags?: boolean;
  /** Whether to show dates */
  showDates?: boolean;
  /** Whether to show reading time */
  showReadTime?: boolean;
  /** Whether to show categories */
  showCategories?: boolean;
  /** Whether to show excerpts */
  showExcerpts?: boolean;
  /** Maximum number of tags to show */
  maxTags?: number;
  /** Additional CSS classes */
  className?: string;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state action */
  emptyAction?: React.ReactNode;
  /** Handler for article click */
  onArticleClick?: (article: Article | FeaturedArticle) => void;
}

/**
 * ArticleGrid component for displaying multiple articles in a grid layout
 */
export default function ArticleGrid({
  articles,
  columns = 3,
  cardVariant = 'default',
  showImages = true,
  showTags = true,
  showDates = true,
  showReadTime = true,
  showCategories = true,
  showExcerpts = true,
  maxTags = 2,
  className = '',
  loading = false,
  emptyMessage = 'No articles found',
  emptyAction,
  onArticleClick
}: ArticleGridProps) {
  // Determine column classes based on the columns prop
  const getColumnClasses = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading articles...</p>
      </div>
    );
  }
  
  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 mac-glass p-8 rounded-xl">
        <div className="flex justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
        {emptyAction && (
          <div className="mt-4">
            {emptyAction}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`grid ${getColumnClasses()} gap-6 ${className}`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          variant={cardVariant}
          showImage={showImages}
          showTags={showTags}
          showDate={showDates}
          showReadTime={showReadTime}
          showCategory={showCategories}
          showExcerpt={showExcerpts}
          maxTags={maxTags}
          onClick={onArticleClick ? () => onArticleClick(article) : undefined}
        />
      ))}
    </div>
  );
}

/**
 * ArticleList component for displaying articles in a list layout
 * This is a variant of ArticleGrid that's optimized for list views
 */
export function ArticleList({
  articles,
  cardVariant = 'compact',
  className = '',
  ...props
}: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{props.emptyMessage || 'No articles found'}</p>
        {props.emptyAction && (
          <div className="mt-4">
            {props.emptyAction}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          variant={cardVariant}
          showImage={props.showImages !== undefined ? props.showImages : true}
          showTags={props.showTags !== undefined ? props.showTags : true}
          showDate={props.showDates !== undefined ? props.showDates : true}
          showReadTime={props.showReadTime !== undefined ? props.showReadTime : true}
          showCategory={props.showCategories !== undefined ? props.showCategories : true}
          showExcerpt={props.showExcerpts !== undefined ? props.showExcerpts : true}
          maxTags={props.maxTags || 2}
          onClick={props.onArticleClick ? () => props.onArticleClick!(article) : undefined}
        />
      ))}
    </div>
  );
}

/**
 * FeaturedArticleLayout component for displaying a featured article with a list of related articles
 */
export function FeaturedArticleLayout({
  featuredArticle,
  relatedArticles,
  className = '',
}: {
  featuredArticle: Article | FeaturedArticle;
  relatedArticles: (Article | FeaturedArticle)[];
  className?: string;
}) {
  if (!featuredArticle) return null;
  
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Featured Article */}
      <ArticleCard
        article={featuredArticle}
        variant="featured"
        showImage={true}
        showTags={true}
        showDate={true}
        showReadTime={true}
        showCategory={true}
        showExcerpt={true}
      />
      
      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Related Articles</h3>
          <ArticleList
            articles={relatedArticles}
            cardVariant="compact"
            showExcerpts={false}
            maxTags={1}
          />
        </div>
      )}
    </div>
  );
}
