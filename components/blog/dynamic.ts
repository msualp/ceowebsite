import { createDynamicComponent } from '@/utils/dynamic-imports';

/**
 * Dynamically imported ArticleCard component
 * Only loaded when needed to reduce initial bundle size
 */
export const DynamicArticleCard = createDynamicComponent(
  () => import('./ArticleCard').then(mod => ({ default: mod.default })),
  { prefetch: true }
);

/**
 * Dynamically imported ArticleGrid component
 */
export const DynamicArticleGrid = createDynamicComponent(
  () => import('./ArticleGrid').then(mod => ({ default: mod.default })),
  { prefetch: true }
);

/**
 * Dynamically imported ArticleTags component
 */
export const DynamicArticleTags = createDynamicComponent(
  () => import('./ArticleTags').then(mod => ({ default: mod.default }))
);

/**
 * Dynamically imported CategoryFilter component
 */
export const DynamicCategoryFilter = createDynamicComponent(
  () => import('./CategoryFilter').then(mod => ({ default: mod.default }))
);

/**
 * Dynamically imported TagFilter component
 */
export const DynamicTagFilter = createDynamicComponent(
  () => import('./TagFilter').then(mod => ({ default: mod.default }))
);

/**
 * Dynamically imported BlogLayout component
 */
export const DynamicBlogLayout = createDynamicComponent(
  () => import('./BlogLayout').then(mod => ({ default: mod.default })),
  { prefetch: true }
);

/**
 * Dynamically imported ResponsiveImage component
 */
export const DynamicResponsiveImage = createDynamicComponent(
  () => import('./ResponsiveImage').then(mod => ({ default: mod.default })),
  { prefetch: true }
);

/**
 * Dynamically imported Pagination component
 */
export const DynamicPagination = createDynamicComponent(
  () => import('./Pagination').then(mod => ({ default: mod.default }))
);

/**
 * Export all dynamic components with their original names
 * This allows for easy drop-in replacement in existing code
 */
export const ArticleCard = DynamicArticleCard;
export const ArticleGrid = DynamicArticleGrid;
export const ArticleTags = DynamicArticleTags;
export const CategoryFilter = DynamicCategoryFilter;
export const TagFilter = DynamicTagFilter;
export const BlogLayout = DynamicBlogLayout;
export const ResponsiveImage = DynamicResponsiveImage;
export const Pagination = DynamicPagination;
