'use client';

import { HiArrowLongRight, HiLightBulb, HiSparkles } from 'react-icons/hi2';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import Button from '../Button';
import { Article, FeaturedArticle } from '@/types/blog';
import ArticleCard from '../blog/ArticleCard';

/**
 * InsightsSection component for the home page
 * Uses the shared ArticleCard component for consistent styling
 */
const InsightsSection = () => {
  // Featured article data
  const featuredArticle: FeaturedArticle = {
    slug: 'precision-and-alignment',
    date: '2025-04-09',
    title: 'Precision and Alignment: Great Lesson from Mentor',
    excerpt: 'How a mentor\'s focus on precise language transformed my approach to leadership and team alignment. This insight explores the powerful impact that thoughtful communication can have on organizational success and personal growth.',
    icon: <HiLightBulb className="w-6 h-6" />,
    iconBg: 'bg-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Leadership', 'Communication'],
    views: 356,
    link: '/insights/precision-and-alignment',
    image: '/images/precision-alignment.jpg',
    imageAlt: 'A mentor and mentee discussing leadership strategies',
    featured: true
  };

  // Smaller articles data
  const smallArticles: FeaturedArticle[] = [
    {
      slug: 'lessons-from-bootstrapping',
      date: '2025-04-09',
      title: 'Lessons from Bootstrapping AEFIS',
      excerpt: 'My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      iconBg: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      tags: ['Startup', 'EdTech'],
      views: 412,
      link: '/insights/lessons-from-bootstrapping',
      category: 'entrepreneurship',
      featured: false
    },
    {
      slug: 'ai-executive-decision-making',
      date: '2025-04-03',
      title: 'AI for Executive Decision-Making',
      excerpt: 'How modern AI tools are reshaping the executive decision-making process.',
      icon: <HiSparkles className="w-5 h-5" />,
      iconBg: 'bg-purple-500',
      gradient: 'from-purple-500 to-fuchsia-600',
      tags: ['AI', 'Leadership'],
      views: 289,
      link: '/insights/ai-executive-decision-making',
      category: 'ai-collaboration',
      featured: false
    }
  ];

  return (
    <Section background="white" spacing="lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Latest Insights" 
          subtitle="Thoughts and perspectives on AI, leadership, and innovation"
          className="mb-12"
        />
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          {/* Featured Article (2/3 width) */}
          <div className="lg:w-2/3">
            {/* Featured badge */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                  <HiSparkles className="mr-1.5 h-4 w-4" />
                  FEATURED
                </div>
              </div>
              
              <ArticleCard 
                article={featuredArticle}
                variant="featured"
                showImage={true}
                showTags={true}
                showDate={true}
                showReadTime={false}
                showCategory={false}
                showExcerpt={true}
              />
            </div>
          </div>
          
          {/* Smaller tiles container (1/3 width) */}
          <div className="lg:w-1/3 grid grid-rows-2 gap-6">
            {/* Map through the smaller insights */}
            {smallArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="compact"
                showImage={false}
                showTags={true}
                showDate={true}
                showReadTime={false}
                showCategory={false}
                showExcerpt={true}
                maxTags={2}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            href="/insights" 
            variant="outline"
            size="lg"
            icon={<HiArrowLongRight className="ml-2" />}
            className="px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all font-medium"
          >
            Browse all insights
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default InsightsSection;
