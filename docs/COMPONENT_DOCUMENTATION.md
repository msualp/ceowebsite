# Blog Component Documentation

This document provides comprehensive documentation for the blog components in the ceowebsite project. These components are designed to be reusable, modular, and type-safe.

## Table of Contents

1. [Overview](#overview)
2. [Component Library](#component-library)
   - [ArticleCard](#articlecard)
   - [ArticleGrid](#articlegrid)
   - [ArticleTags](#articletags)
   - [CategoryFilter](#categoryfilter)
   - [TagFilter](#tagfilter)
   - [BlogLayout](#bloglayout)
   - [ResponsiveImage](#responsiveimage)
   - [Pagination](#pagination)
3. [Dynamic Imports](#dynamic-imports)
4. [Performance Optimization](#performance-optimization)
5. [Usage Examples](#usage-examples)

## Overview

The blog component library is designed to provide a consistent, maintainable, and performant way to display blog content across the website. The components are built with TypeScript for type safety and follow best practices for accessibility and performance.

Key features:
- TypeScript interfaces for type safety
- Responsive design for all screen sizes
- Accessibility compliance
- Dark mode support
- Performance optimizations
- Modular and reusable components

## Component Library

### ArticleCard

`ArticleCard` is a versatile component for displaying article information in various formats.

**Props:**
```typescript
interface ArticleCardProps {
  /** Article data */
  article: Article;
  /** Card variant */
  variant?: ArticleCardVariant;
  /** Whether to show the image */
  showImage?: boolean;
  /** Whether to show the excerpt */
  showExcerpt?: boolean;
  /** Whether to show the category */
  showCategory?: boolean;
  /** Whether to show tags */
  showTags?: boolean;
  /** Whether to show the date */
  showDate?: boolean;
  /** Whether to show the read time */
  showReadTime?: boolean;
  /** Maximum number of tags to show */
  maxTags?: number;
  /** Optional CSS classes */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
}
```

**Variants:**
- `default`: Standard card with image, title, excerpt, and metadata
- `featured`: Larger card with prominent image and more details
- `compact`: Smaller card with minimal information
- `minimal`: Text-only card with just title and minimal metadata

**Example:**
```tsx
import { ArticleCard } from '@/components/blog';

// Basic usage
<ArticleCard article={article} />

// Featured article with all details
<ArticleCard 
  article={article} 
  variant="featured"
  showImage={true}
  showExcerpt={true}
  showCategory={true}
  showTags={true}
  showDate={true}
  showReadTime={true}
/>

// Compact card without image
<ArticleCard 
  article={article} 
  variant="compact"
  showImage={false}
  showExcerpt={false}
/>
```

### ArticleGrid

`ArticleGrid` displays multiple articles in a responsive grid layout.

**Props:**
```typescript
interface ArticleGridProps {
  /** Array of articles to display */
  articles: Article[];
  /** Number of columns (1-4) */
  columns?: 1 | 2 | 3 | 4;
  /** Card variant to use */
  variant?: ArticleCardVariant;
  /** Whether to show images */
  showImage?: boolean;
  /** Whether to show excerpts */
  showExcerpt?: boolean;
  /** Whether to show categories */
  showCategory?: boolean;
  /** Whether to show tags */
  showTags?: boolean;
  /** Whether to show dates */
  showDate?: boolean;
  /** Whether to show read times */
  showReadTime?: boolean;
  /** Maximum number of tags to show */
  maxTags?: number;
  /** Optional CSS classes */
  className?: string;
}
```

**Example:**
```tsx
import { ArticleGrid } from '@/components/blog';

// Basic 2-column grid
<ArticleGrid 
  articles={articles} 
  columns={2}
/>

// 3-column grid with compact cards
<ArticleGrid 
  articles={articles} 
  columns={3}
  variant="compact"
  showImage={true}
  showExcerpt={false}
/>
```

### ArticleTags

`ArticleTags` displays a list of tags with consistent styling.

**Props:**
```typescript
interface ArticleTagsProps {
  /** Array of tag strings */
  tags: string[];
  /** Maximum number of tags to display */
  maxTags?: number;
  /** Whether to show a count of hidden tags */
  showCount?: boolean;
  /** Optional click handler for tags */
  onTagClick?: (tag: string) => void;
  /** Optional CSS classes */
  className?: string;
}
```

**Example:**
```tsx
import { ArticleTags } from '@/components/blog';

// Basic usage
<ArticleTags tags={article.tags} />

// Limit to 3 tags with count
<ArticleTags 
  tags={article.tags} 
  maxTags={3}
  showCount={true}
/>

// With click handler
<ArticleTags 
  tags={article.tags} 
  onTagClick={(tag) => handleTagFilter(tag)}
/>
```

### CategoryFilter

`CategoryFilter` provides a UI for filtering articles by category.

**Props:**
```typescript
interface CategoryFilterProps {
  /** Array of category objects */
  categories: Array<{
    id: string;
    name: string;
    icon?: React.ReactNode;
  }>;
  /** Currently selected category ID */
  selectedCategory: string;
  /** Handler for category change */
  onCategoryChange: (category: string) => void;
  /** Optional CSS classes */
  className?: string;
}
```

**Example:**
```tsx
import { CategoryFilter } from '@/components/blog';

const categories = [
  { id: 'all', name: 'All Articles' },
  { id: 'ai-collaboration', name: 'AI Collaboration' },
  { id: 'product-vision', name: 'Product Vision' },
];

<CategoryFilter 
  categories={categories}
  selectedCategory={currentCategory}
  onCategoryChange={handleCategoryChange}
/>
```

### TagFilter

`TagFilter` provides a UI for filtering articles by tag.

**Props:**
```typescript
interface TagFilterProps {
  /** Array of tag strings */
  tags: string[];
  /** Currently selected tag */
  selectedTag?: string;
  /** Handler for tag selection */
  onTagSelect: (tag: string) => void;
  /** Optional CSS classes */
  className?: string;
}
```

**Example:**
```tsx
import { TagFilter } from '@/components/blog';

<TagFilter 
  tags={allTags}
  selectedTag={currentTag}
  onTagSelect={handleTagSelect}
/>
```

### BlogLayout

`BlogLayout` provides a consistent layout for blog pages.

**Props:**
```typescript
interface BlogLayoutProps {
  /** Main content */
  children: React.ReactNode;
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Whether the sidebar is on the right (default) or left */
  sidebarPosition?: 'left' | 'right';
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Optional CSS classes */
  className?: string;
}
```

**Example:**
```tsx
import { BlogLayout, BlogSidebar } from '@/components/blog';

<BlogLayout
  sidebar={<BlogSidebar categories={categories} tags={tags} />}
  header={<PageHeader title="Blog" />}
>
  <ArticleGrid articles={articles} />
</BlogLayout>
```

### ResponsiveImage

`ResponsiveImage` provides optimized, responsive images with lazy loading.

**Props:**
```typescript
interface ResponsiveImageProps {
  /** Image source URL or BlogImage object */
  src: string | BlogImage;
  /** Alt text for the image */
  alt?: string;
  /** Optional width in pixels */
  width?: number;
  /** Optional height in pixels */
  height?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to fill the container */
  fill?: boolean;
  /** Optional priority loading */
  priority?: boolean;
  /** Optional loading strategy (eager, lazy) */
  loading?: 'eager' | 'lazy';
  /** Optional object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Optional object position */
  objectPosition?: string;
  /** Optional caption */
  caption?: string;
  /** Optional threshold for intersection observer (0-1) */
  threshold?: number;
}
```

**Example:**
```tsx
import { ResponsiveImage } from '@/components/blog';

// Basic usage
<ResponsiveImage 
  src={article.image} 
  alt={article.imageAlt || article.title}
/>

// With specific dimensions and priority loading
<ResponsiveImage 
  src={article.image} 
  alt={article.imageAlt}
  width={800}
  height={450}
  priority={true}
/>

// Fill container with custom object fit
<ResponsiveImage 
  src={article.image} 
  alt={article.imageAlt}
  fill={true}
  objectFit="cover"
  objectPosition="center"
/>
```

### Pagination

`Pagination` provides navigation for paginated content.

**Props:**
```typescript
interface PaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Current page number (1-based) */
  currentPage: number;
  /** Base URL for pagination links */
  baseUrl: string;
  /** Query parameter name for page */
  pageParam?: string;
  /** Optional CSS classes */
  className?: string;
  /** Optional callback when page changes */
  onPageChange?: (page: number) => void;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
}
```

**Example:**
```tsx
import { Pagination } from '@/components/blog';

<Pagination
  totalItems={100}
  itemsPerPage={10}
  currentPage={2}
  baseUrl="/insights"
  onPageChange={handlePageChange}
/>
```

## Dynamic Imports

For performance optimization, all blog components can be dynamically imported using the `components/blog/dynamic.ts` module:

```tsx
import { 
  ArticleCard, 
  ArticleGrid,
  // ... other components
} from '@/components/blog/dynamic';

// These components are loaded on demand, reducing initial bundle size
```

## Performance Optimization

The blog components are optimized for performance in several ways:

1. **Lazy Loading Images**: The `ResponsiveImage` component uses Intersection Observer to only load images when they enter the viewport.

2. **Dynamic Imports**: Components can be loaded on demand using the dynamic imports module.

3. **Pagination**: The `Pagination` component allows breaking large lists of articles into smaller, more manageable chunks.

4. **Performance Monitoring**: The `usePerformance` hook can be used to measure component performance.

Example of using the performance hook:

```tsx
import { usePerformance } from '@/hooks/usePerformance';

function MyComponent() {
  const { measureFunction } = usePerformance({
    benchmarkId: 'my-component',
    componentName: 'MyComponent',
  });
  
  // Measure a function's performance
  const processData = () => {
    return measureFunction('processData', () => {
      // Expensive operation
      return result;
    });
  };
  
  return <div>{/* Component content */}</div>;
}
```

## Usage Examples

### Basic Blog Page

```tsx
import { 
  ArticleGrid, 
  CategoryFilter, 
  BlogLayout, 
  Pagination 
} from '@/components/blog';

function BlogPage({ articles, categories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter articles by category
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);
  
  // Paginate articles
  const itemsPerPage = 6;
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  
  return (
    <BlogLayout
      header={<h1>Blog</h1>}
      sidebar={
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      }
    >
      <ArticleGrid
        articles={currentArticles}
        columns={2}
        showImage={true}
        showExcerpt={true}
      />
      
      <Pagination
        totalItems={filteredArticles.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        baseUrl="/blog"
        onPageChange={setCurrentPage}
      />
    </BlogLayout>
  );
}
```

### Featured Article with Related Articles

```tsx
import { 
  ArticleCard, 
  ArticleGrid, 
  ResponsiveImage 
} from '@/components/blog';

function FeaturedArticlePage({ featuredArticle, relatedArticles }) {
  return (
    <div className="space-y-12">
      <div className="featured-article">
        <ResponsiveImage
          src={featuredArticle.image}
          alt={featuredArticle.imageAlt}
          priority={true}
          height={500}
          className="rounded-xl"
        />
        
        <h1 className="text-3xl font-bold mt-6">{featuredArticle.title}</h1>
        
        <ArticleCard
          article={featuredArticle}
          variant="featured"
          showImage={false} // We already show the image above
          showExcerpt={true}
          showCategory={true}
          showTags={true}
          showDate={true}
          showReadTime={true}
        />
      </div>
      
      <div className="related-articles">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        
        <ArticleGrid
          articles={relatedArticles}
          columns={3}
          variant="compact"
          showImage={true}
          showExcerpt={false}
        />
      </div>
    </div>
  );
}
