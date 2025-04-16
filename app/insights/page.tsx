'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import Image from 'next/image';
import Link from 'next/link';
import LazyNewsletterForm from '@/components/lazy/LazyNewsletterForm';
import LazyFeaturedArticlesHero from '@/components/lazy/LazyFeaturedArticlesHero';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import InsightCard from '@/components/InsightCard';
import TagFilter from '@/components/TagFilter';
import Button from '@/components/Button';
import { HiArrowLongRight, HiFunnel, HiOutlineBookmark, HiOutlineClock, HiOutlineBolt, HiOutlineStar, HiOutlineTag } from 'react-icons/hi2';
import { CTAGroup } from '@/components/cta/CTAGroup';
import { Button as CTAButton } from '@/components/cta/Button';
import { Post } from './getInsights';

// Define the categories
const categories = [
  { id: 'all', name: 'All Articles', icon: <HiFunnel className="w-4 h-4" /> },
  { id: 'ai-collaboration', name: 'AI Collaboration', icon: <HiOutlineBolt className="w-4 h-4" /> },
  { id: 'product-vision', name: 'Product Vision', icon: <HiOutlineStar className="w-4 h-4" /> },
  { id: 'entrepreneurship', name: 'Entrepreneurship', icon: <HiOutlineBookmark className="w-4 h-4" /> },
  { id: 'future-of-work', name: 'Future of Work', icon: <HiOutlineClock className="w-4 h-4" /> },
  { id: 'technical', name: 'Technical', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 3L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 19H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageContainer title="Insights & Blog">
      {/* Featured Articles Hero */}
      <LazyFeaturedArticlesHero featuredArticles={featuredArticles} />
      
      {/* Hero Section with Featured Article */}
      {featuredPost && (
        <div className="relative mb-16 fade-in-reveal">
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
                    {formatDate(featuredPost.date)}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {featuredPost.title}
                </h1>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="mt-auto flex items-center space-x-4">
                  <Link href={`/insights/${featuredPost.slug}`}>
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
                      {featuredPost.readTime || '5 min read'}
                    </span>
                    
                    {featuredPost.category && (
                      <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={featuredPost.image || "/images/default-cover.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-gray-900/80 to-transparent md:bg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <SectionTitle 
        title="Insights & Blog" 
        subtitle="Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential."
        className="mb-8"
      />
      
      {/* Filter Section */}
      <div className="mb-8">
        {/* Category Filter Pills */}
        <div className="relative flex overflow-x-auto pb-4 mb-4 hide-scrollbar snap-x snap-mandatory md:snap-none md:justify-center">
          <div className="flex gap-2 px-4 md:px-0 md:flex-wrap">
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  snap-start inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all
                  ${category.id === selectedCategory 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'}
                `}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tag Filter */}
        <TagFilter 
          tags={tagData} 
          onTagSelect={handleTagSelect} 
          selectedTag={selectedTag} 
        />
        
        {/* Active filters display */}
        {selectedTag && (
          <div className="flex items-center mb-4 px-4 md:px-0">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filter:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <HiOutlineTag className="mr-1 w-3 h-3" />
              {selectedTag}
              <button 
                onClick={() => handleTagSelect('')}
                className="ml-1 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>Loading insights...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 mac-glass p-8 rounded-xl">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">No insights found for this category.</p>
              <Button 
                onClick={() => handleCategoryChange('all')}
                variant="outline"
                size="sm"
              >
                View all articles
              </Button>
            </div>
          ) : (
            <div className="space-y-6 stagger-fade-in visible">
              {posts.map((post, index) => (
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
                            alt={post.title}
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
                            {formatDate(post.date)}
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
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-8">
          <div className="mac-glass p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800/40">
            <h4 className="text-lg font-bold mb-3 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 p-1.5 rounded-lg mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10H5C3.895 10 3 9.105 3 8C3 6.895 3.895 6 5 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 6H19C20.105 6 21 6.895 21 8C21 9.105 20.105 10 19 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M7 15C7 18.314 9.686 21 13 21C16.314 21 19 18.314 19 15H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.7573 10.24C15.4505 10.24 16.8237 8.86681 16.8237 7.17359C16.8237 5.48038 15.4505 4.10718 13.7573 4.10718C12.064 4.10718 10.6908 5.48038 10.6908 7.17359" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16.6638 7.06633L18.8014 4.92873" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              Get in Touch
            </h4>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
              Interested in discussing AI collaboration or entrepreneurship?
            </p>
            <div className="space-y-2">
              <CTAGroup 
                variant="compact" 
                primaryCTA="calendly" 
                secondaryCTA="none" 
                direction="column"
              />
              <CTAButton 
                href="https://www.linkedin.com/in/sualp/"
                variant="linkedin"
                size="sm"
                fullWidth
                rightIcon={<HiArrowLongRight className="w-4 h-4" />}
                external
              >
                Connect on LinkedIn
              </CTAButton>
              <CTAButton 
                href="mailto:msualp@sociail.com"
                variant="outline"
                size="sm"
                fullWidth
                external
              >
                Email Me
              </CTAButton>
            </div>
          </div>
          
          <div className="mac-glass p-6 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl rounded-full"></div>
            
            <h4 className="text-lg font-bold mb-3 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 p-1.5 rounded-lg mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3H16.5C18.985 3 21 5.015 21 7.5C21 9.985 18.985 12 16.5 12H3V7.5C3 5.015 5.015 3 7.5 3H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21H7.5C5.015 21 3 18.985 3 16.5C3 14.015 5.015 12 7.5 12H21V16.5C21 18.985 18.985 21 16.5 21H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 15.5C8.32843 15.5 9 14.8284 9 14C9 13.1716 8.32843 12.5 7.5 12.5C6.67157 12.5 6 13.1716 6 14C6 14.8284 6.67157 15.5 7.5 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.5 9.5C17.3284 9.5 18 8.82843 18 8C18 7.17157 17.3284 6.5 16.5 6.5C15.6716 6.5 15 7.17157 15 8C15 8.82843 15.6716 9.5 16.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              About Sociail
            </h4>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
              Discover how we're redefining AI collaboration for teams and transforming how organizations work together.
            </p>
            <Button 
              href="/sociail" 
              variant="primary"
              size="sm"
              fullWidth
              className="mb-2"
              icon={<HiArrowLongRight className="w-4 h-4" />}
            >
              Learn More
            </Button>
          </div>
          
          <div className="mac-glass p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800/40">
            <h4 className="text-lg font-bold mb-3 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 p-1.5 rounded-lg mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19H8C5.791 19 4 17.209 4 15V12C4 9.791 5.791 8 8 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M15 8H16C18.209 8 20 9.791 20 12V15C20 17.209 18.209 19 16 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 12L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 15L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 9L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              Popular Articles
            </h4>
            <ul className="space-y-4">
              <li className="group">
                <Link href="/insights/precision-and-alignment" className="flex items-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400">→</span>
                  <span className="flex-1">Precision and Alignment: Great Lesson from Mentor</span>
                </Link>
              </li>
              <li className="group">
                <Link href="/insights/lessons-from-bootstrapping" className="flex items-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400">→</span>
                  <span className="flex-1">Lessons from Bootstrapping AEFIS</span>
                </Link>
              </li>
              <li className="group">
                <Link href="/insights/real-time-ai-collaboration" className="flex items-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-gray-400 dark:text-gray-500 mr-2 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400">→</span>
                  <span className="flex-1">The Rise of Real-Time AI Collaboration</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mt-16 mb-12 max-w-4xl mx-auto fade-in-scroll">
        <div className="img-with-caption relative rounded-xl overflow-hidden group">
          <Image
            src="/images/we-are-all-students.png"
            alt="We Are All Students"
            width={800}
            height={400}
            className="w-full rounded-xl shadow-md transition-transform duration-700 group-hover:scale-105"
          />
          <div className="caption-reveal absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-0 opacity-80 group-hover:opacity-100 transition-all">
            "We are all students." A mantra I live by as a devoted lifelong learner.
          </div>
        </div>
      </div>

      <Section background="light" spacing="md" className="mt-12 rounded-xl mac-glass border border-blue-50 dark:border-blue-900/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 blur-2xl rounded-full"></div>
        
        <SectionTitle 
          title="Stay in the Loop" 
          subtitle="Join our newsletter to receive the latest insights on AI, leadership, and productivity."
          className="mb-6"
        />
        
        <div className="max-w-md mx-auto relative">
          <LazyNewsletterForm />
        </div>
      </Section>
    </PageContainer>
  );
}
