'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { 
  HiChevronRight, 
  HiMagnifyingGlass, 
  HiClock, 
  HiUser, 
  HiTag,
  HiShare,
  HiArrowLongRight
} from 'react-icons/hi2';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaLink 
} from 'react-icons/fa';

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(null);
  
  // Sample categories - replace with your actual categories
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'ai-collaboration', name: 'AI Collaboration' },
    { id: 'product-vision', name: 'Product Vision' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'future-of-work', name: 'Future of Work' },
    { id: 'technical', name: 'Technical' },
  ];
  
  // Sample articles data - replace with your actual blog posts
  const articles = [
    {
      id: '1',
      title: 'The Third Wave of Collaboration: Why AI + Human Teams Will Redefine Productivity',
      excerpt: 'How collaboration has evolved from in-person to digital, and now to AI-augmented teamwork, positioning Sociail as the platform for this third evolutionary stage.',
      date: 'April 5, 2025',
      author: 'Mustafa Sualp',
      readTime: '7 min read',
      category: 'ai-collaboration',
      featured: true,
      image: '/images/blog/third-wave-collaboration.jpg',
      slug: 'third-wave-collaboration'
    },
    {
      id: '2',
      title: 'From EdTech to AI: My Journey Across Innovation Frontiers',
      excerpt: 'Connect your AEFIS experience to your current work, highlighting the common threads of transforming established systems.',
      date: 'March 22, 2025',
      author: 'Mustafa Sualp',
      readTime: '5 min read',
      category: 'entrepreneurship',
      featured: false,
      image: '/images/blog/edtech-to-ai.jpg',
      slug: 'edtech-to-ai-journey'
    },
    {
      id: '3',
      title: 'The Invisible Integration: Why AI Should Feel Like a Natural Extension of Teams',
      excerpt: 'Articulate your vision for AI integration that disappears into the workflow rather than standing apart.',
      date: 'March 15, 2025',
      author: 'Mustafa Sualp',
      readTime: '6 min read',
      category: 'product-vision',
      featured: true,
      image: '/images/blog/invisible-integration.jpg',
      slug: 'invisible-integration'
    },
    {
      id: '4',
      title: 'The Idea Economy: How English Became the New Programming Language',
      excerpt: 'Explore how natural language is replacing programming languages as the primary interface for creation in the age of AI.',
      date: 'March 8, 2025',
      author: 'Mustafa Sualp',
      readTime: '8 min read',
      category: 'future-of-work',
      featured: true,
      image: '/images/blog/idea-economy.jpg',
      slug: 'idea-economy'
    },
    {
      id: '5',
      title: 'Building on Open Source: How Matrix Protocol Powers the Future of Collaboration',
      excerpt: 'Share your technical foundation choices and philosophy around open systems.',
      date: 'February 28, 2025',
      author: 'Mustafa Sualp',
      readTime: '6 min read',
      category: 'technical',
      featured: false,
      image: '/images/blog/open-source-matrix.jpg',
      slug: 'building-on-open-source'
    },
    {
      id: '6',
      title: 'The Serial Entrepreneur's Dilemma: Balancing Vision and Execution',
      excerpt: 'An honest reflection on the challenges of being both visionary and practical as a founder.',
      date: 'February 21, 2025',
      author: 'Mustafa Sualp',
      readTime: '5 min read',
      category: 'entrepreneurship',
      featured: false,
      image: '/images/blog/vision-execution.jpg',
      slug: 'serial-entrepreneur-dilemma'
    },
    {
      id: '7',
      title: 'AI's Missing Interface: Why Chat Will Eat the World',
      excerpt: 'Position chat as the natural medium for human-AI interaction, supporting Sociail's approach.',
      date: 'February 14, 2025',
      author: 'Mustafa Sualp',
      readTime: '7 min read',
      category: 'product-vision',
      featured: false,
      image: '/images/blog/chat-interface.jpg',
      slug: 'ai-missing-interface'
    },
    {
      id: '8',
      title: 'Real-time Collective Intelligence: The Technical Architecture Behind Sociail',
      excerpt: 'A deeper dive into how Sociail actually works and the technical innovations that make it possible.',
      date: 'February 7, 2025',
      author: 'Mustafa Sualp',
      readTime: '9 min read',
      category: 'technical',
      featured: false,
      image: '/images/blog/technical-architecture.jpg',
      slug: 'realtime-collective-intelligence'
    },
  ];
  
  // Effect to filter articles based on category and search
  useEffect(() => {
    let results = articles;
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(article => article.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredArticles(results);
  }, [activeCategory, searchQuery]);
  
  // Initialize filtered articles on component mount
  useEffect(() => {
    setFilteredArticles(articles);
  }, []);
  
  // Featured articles (the ones marked as featured)
  const featuredArticles = articles.filter(article => article.featured);
  
  // Handle share functionality
  const handleShare = (articleId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(showShareMenu === articleId ? null : articleId);
  };
  
  // Function to get the correct share URL
  const getShareUrl = (slug) => {
    // In a real implementation, you'd use the full URL
    return `https://mustafasualp.com/insights/${slug}`;
  };
  
  // Function to handle social sharing
  const shareToSocial = (platform, slug, title) => {
    const url = encodeURIComponent(getShareUrl(slug));
    const text = encodeURIComponent(title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(getShareUrl(slug))
          .then(() => {
            alert('Link copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
        setShowShareMenu(null);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(null);
    }
  };
  
  return (
    <PageContainer title="Insights">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-6 rounded-xl mb-16 overflow-hidden">
        {/* Abstract Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated Circle */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Insights
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore thoughts on AI collaboration, entrepreneurship, and the future of work from Mustafa Sualp and the Sociail team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 rounded-lg shadow-lg text-gray-800 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/50 pl-12"
            />
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </section>
      
      {/* Categories Navigation */}
      <section className="mb-12 overflow-auto pb-4">
        <div className="flex gap-2 md:gap-4 min-w-max">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>
      
      {/* Featured Articles Section */}
      {activeCategory === 'all' && searchQuery === '' && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-1 rounded mr-2">
              <HiChevronRight className="w-5 h-5" />
            </span>
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Primary Featured Article */}
            <div className="lg:col-span-8 group">
              <Link href={`/insights/${featuredArticles[0]?.slug}`} className="block relative rounded-xl overflow-hidden aspect-video shadow-lg transition-transform hover:shadow-xl">
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                
                {/* Image with Zoom Effect */}
                <div className="absolute inset-0 bg-gray-900">
                  <Image
                    src={featuredArticles[0]?.image || '/images/blog/placeholder.jpg'}
                    alt={featuredArticles[0]?.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full mr-2">
                      {categories.find(c => c.id === featuredArticles[0]?.category)?.name}
                    </span>
                    <span className="text-gray-300 text-sm flex items-center">
                      <HiClock className="w-4 h-4 mr-1" />
                      {featuredArticles[0]?.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredArticles[0]?.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{featuredArticles[0]?.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
                        {featuredArticles[0]?.author.charAt(0)}
                      </div>
                      <span className="text-white">{featuredArticles[0]?.author}</span>
                    </div>
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Article <HiArrowLongRight className="inline-block ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Secondary Featured Articles */}
            <div className="lg:col-span-4 grid gap-6">
              {featuredArticles.slice(1, 3).map((article, index) => (
                <Link key={article.id} href={`/insights/${article.slug}`} className="block relative rounded-xl overflow-hidden aspect-[4/3] shadow-md transition-all hover:shadow-lg group">
                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                  
                  {/* Image with Zoom Effect */}
                  <div className="absolute inset-0 bg-gray-900">
                    <Image
                      src={article.image || '/images/blog/placeholder.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{article.title}</h3>
                    <div className="flex items-center text-xs text-gray-300">
                      <span className="flex items-center mr-3">
                        <HiUser className="w-3 h-3 mr-1" />
                        {article.author}
                      </span>
                      <span className="flex items-center">
                        <HiClock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Articles Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-1 rounded mr-2">
            <HiChevronRight className="w-5 h-5" />
          </span>
          {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
          {searchQuery && <span className="ml-2 text-gray-500 font-normal text-lg">searching for "{searchQuery}"</span>}
        </h2>
        
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full group relative">
                {/* Article Image */}
                <Link href={`/insights/${article.slug}`} className="block relative aspect-[1.91/1] overflow-hidden">
                  <Image
                    src={article.image || '/images/blog/placeholder.jpg'}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                
                {/* Article Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                      <HiTag className="w-3 h-3 mr-1" />
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto flex items-center">
                      <HiClock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <Link href={`/insights/${article.slug}`} className="block">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                  </Link>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{article.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{article.date}</p>
                      </div>
                    </div>
                    
                    {/* Share Button */}
                    <div className="relative z-20">
                      <button 
                        onClick={(e) => handleShare(article.id, e)}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        aria-label="Share article"
                      >
                        <HiShare className="w-5 h-5" />
                      </button>
                      
                      {/* Share Menu */}
                      {showShareMenu === article.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-30">
                          <div className="p-2">
                            <button 
                              onClick={() => shareToSocial('twitter', article.slug, article.title)}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              <FaTwitter className="w-4 h-4 mr-3 text-blue-400" />
                              Twitter
                            </button>
                            <button 
                              onClick={() => shareToSocial('linkedin', article.slug, article.title)}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              <FaLinkedinIn className="w-4 h-4 mr-3 text-blue-600" />
                              LinkedIn
                            </button>
                            <button 
                              onClick={() => shareToSocial('facebook', article.slug, article.title)}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              <FaFacebookF className="w-4 h-4 mr-3 text-blue-800" />
                              Facebook
                            </button>
                            <button 
                              onClick={() => shareToSocial('copy', article.slug, article.title)}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              <FaLink className="w-4 h-4 mr-3 text-gray-600" />
                              Copy Link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl mb-12 shadow-md border border-blue-100 dark:border-blue-800/30">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-3">Subscribe to the Sociail Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-0">
              Get notified when we publish new articles about AI collaboration, entrepreneurship, and the future of work. No spam, just valuable insights.
            </p>
          </div>
          <div className="md:w-1/3 w-full">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-l-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Email address"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}