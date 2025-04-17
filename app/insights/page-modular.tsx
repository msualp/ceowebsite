'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import TagFilter from '@/components/TagFilter';
import LazyFeaturedArticlesHero from '@/components/lazy/LazyFeaturedArticlesHero';
import { Post } from './getInsights';
import { Article, FeaturedArticle as FeaturedArticleType } from '@/types/blog';
import { 
  FeaturedPost, 
  PostsList, 
  Sidebar, 
  CategoryFilter, 
  defaultCategories,
  ActiveTagFilter,
  Newsletter,
  QuoteImage
} from './components';

export default function InsightsPage() {
  // State for posts and loading
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  
  // Define a type for the featured articles that matches what the component expects
  type FeaturedArticle = {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: React.ReactNode | null;
    iconBg: string;
    gradient: string;
    tags: { name: string; color: string }[];
    views: number;
    link: string;
    image: string;
    slug?: string; // Include slug to satisfy the Post type requirements
  };
  
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [tagData, setTagData] = useState<{theme: string[], type: string[], time: string[]}>({
    theme: [],
    type: [],
    time: []
  });
  
  // Get the category and tag from URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const tag = urlParams.get('tag') || '';
    setSelectedCategory(category);
    setSelectedTag(tag);
    
    // Fetch tag data
    fetch('/api/insights/tags')
      .then(response => response.json())
      .then(data => {
        setTagData(data);
      })
      .catch(error => {
        console.error('Error fetching tag data:', error);
      });
  }, []);
  
  // Fetch posts when category or tag changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let url = '/api/insights';
        
        if (selectedCategory !== 'all') {
          url += `?category=${selectedCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch insights');
        const data = await response.json();
        
        // Store all posts for filtering
        setAllPosts(data);
        
        // Get top 3 articles for the hero section
        const sortedPosts = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Create featured articles array
        const topFeaturedArticles: FeaturedArticle[] = [];
        
        // Add first article
        if (sortedPosts.length > 0) {
          const firstPost = sortedPosts[0];
          topFeaturedArticles.push({
            id: 1,
            date: firstPost.date,
            title: firstPost.title,
            description: firstPost.excerpt,
            icon: null,
            iconBg: 'bg-blue-500',
            gradient: 'from-blue-500 to-indigo-600',
            tags: firstPost.tags ? firstPost.tags.slice(0, 2).map((tag: string) => ({
              name: tag,
              color: 'blue'
            })) : [],
            views: Math.floor(Math.random() * 500) + 100,
            link: `/insights/${firstPost.slug}`,
            image: firstPost.image || '/images/ai-collaboration-hero.jpg',
            slug: firstPost.slug
          });
        }
        
        // Add custom AI Companion article as the second article
        topFeaturedArticles.push({
          id: 2,
          date: 'April 7, 2025',
          title: 'The Rise of the AI Companion: From Interface to Intellect',
          description: 'Exploring how AI companions are evolving from simple interfaces to intellectual partners that understand context, emotions, and human needs.',
          icon: null,
          iconBg: 'bg-emerald-500',
          gradient: 'from-emerald-500 to-teal-600',
          tags: [
            { name: 'AI Companions', color: 'emerald' },
            { name: 'Future Tech', color: 'teal' }
          ],
          views: 487,
          link: '/insights/ai-companion-evolution',
          image: '/images/ai-companion.jpg',
          slug: 'ai-companion-evolution'
        });
        
        // Add "Chat Will Eat the World" as the third article
        topFeaturedArticles.push({
          id: 3,
          date: 'April 4, 2025',
          title: 'Chat Will Eat the World',
          description: 'How conversational interfaces are becoming the primary way we interact with technology and why this shift is transforming every industry.',
          icon: null,
          iconBg: 'bg-purple-500',
          gradient: 'from-purple-500 to-fuchsia-600',
          tags: [
            { name: 'Conversational AI', color: 'purple' },
            { name: 'Future Tech', color: 'fuchsia' }
          ],
          views: 342,
          link: '/insights/chat-will-eat-the-world',
          image: '/images/chat-future.jpg',
          slug: 'chat-will-eat-the-world'
        });
        setFeaturedArticles(topFeaturedArticles);
        
        // Find "The Third Wave of Collaboration" article to set as featured
        const thirdWaveIndex = data.findIndex((post: Post) => post.slug === 'third-wave-collaboration');
        
        // Apply tag filtering if a tag is selected
        let filteredPosts = data;
        if (selectedTag) {
          filteredPosts = data.filter((post: Post) => post.tags?.includes(selectedTag));
        }
        
        // Set the Third Wave article as featured if we have 'all' category, no tag selected, and the article exists
        if (selectedCategory === 'all' && !selectedTag && thirdWaveIndex !== -1) {
          const thirdWavePost = data[thirdWaveIndex];
          setFeaturedPost(thirdWavePost);
          
          // Remove the featured post from the regular posts list
          const otherPosts = [...filteredPosts];
          const featuredInFiltered = otherPosts.findIndex((post: Post) => post.slug === 'third-wave-collaboration');
          if (featuredInFiltered !== -1) {
            otherPosts.splice(featuredInFiltered, 1);
          }
          setPosts(otherPosts);
        } else {
          setFeaturedPost(null);
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Error fetching insights:', error);
        setPosts([]);
        setAllPosts([]);
        setFeaturedPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [selectedCategory, selectedTag]);
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    if (selectedTag) {
      url.searchParams.set('tag', selectedTag);
    }
    window.history.pushState({}, '', url);
  };
  
  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set('tag', tag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.pushState({}, '', url);
  };

  // Get popular articles for the sidebar
  const getPopularArticles = (): Article[] => {
    return [
      {
        slug: 'precision-and-alignment',
        title: 'Precision and Alignment: Great Lesson from Mentor',
        date: '2025-04-09'
      },
      {
        slug: 'lessons-from-bootstrapping',
        title: 'Lessons from Bootstrapping AEFIS',
        date: '2025-04-07'
      },
      {
        slug: 'real-time-ai-collaboration',
        title: 'The Rise of Real-Time AI Collaboration',
        date: '2025-04-04'
      }
    ];
  };

  return (
    <PageContainer title="Insights & Blog">
      {/* Featured Articles Hero */}
      <LazyFeaturedArticlesHero featuredArticles={featuredArticles} />
      
      {/* Hero Section with Featured Article */}
      {featuredPost && (
        <FeaturedPost post={featuredPost} />
      )}
      
      <SectionTitle 
        title="Insights & Blog" 
        subtitle="Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential."
        className="mb-8"
      />
      
      {/* Filter Section */}
      <div className="mb-8">
        {/* Category Filter Pills */}
        <CategoryFilter 
          categories={defaultCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Tag Filter */}
        <TagFilter 
          tags={tagData} 
          onTagSelect={handleTagSelect} 
          selectedTag={selectedTag} 
        />
        
        {/* Active filters display */}
        <ActiveTagFilter 
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <PostsList 
            posts={posts}
            loading={loading}
            emptyMessage="No articles found"
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {/* Sidebar */}
        <Sidebar 
          popularArticles={getPopularArticles()}
          className="md:w-1/3"
        />
      </div>

      {/* Quote Image */}
      <QuoteImage 
        src="/images/we-are-all-students.png"
        alt="We Are All Students"
        quote='"We are all students." A mantra I live by as a devoted lifelong learner.'
      />

      {/* Newsletter Section */}
      <Newsletter />
    </PageContainer>
  );
}
