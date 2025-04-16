/**
 * Lazy-loaded FeaturedArticlesHero component
 * 
 * This component uses React.lazy and Suspense to load the FeaturedArticlesHero component
 * only when it's needed, reducing the initial bundle size.
 */

import { lazyLoad } from '@/lib/code-splitting';

// Custom loading component for the featured articles hero
const FeaturedArticlesHeroLoading = () => (
  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-6 rounded-xl overflow-hidden mb-12 animate-pulse">
    <div className="max-w-6xl mx-auto">
      <div className="h-8 bg-white/20 w-64 rounded-full mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 lg:row-span-2 bg-white/10 rounded-xl h-[500px]"></div>
        <div className="bg-white/10 rounded-xl h-[240px]"></div>
        <div className="bg-white/10 rounded-xl h-[240px]"></div>
      </div>
    </div>
  </div>
);

// Lazy load the FeaturedArticlesHero component
const LazyFeaturedArticlesHero = lazyLoad(
  () => import('@/app/insights/FeaturedArticlesHero.jsx'),
  FeaturedArticlesHeroLoading
);

export default LazyFeaturedArticlesHero;
