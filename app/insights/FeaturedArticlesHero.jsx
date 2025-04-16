'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiArrowLongRight, HiSparkles, HiLightBulb } from 'react-icons/hi2';
import { FaBookmark, FaChartLine, FaLightbulb } from 'react-icons/fa';

const FeaturedArticlesHero = ({ featuredArticles }) => {
  const [hoveredArticle, setHoveredArticle] = useState(null);
  
  // Use the provided articles or fallback to these defaults
  const articles = featuredArticles || [
    {
      id: 1,
      date: 'April 9, 2025',
      title: 'Precision and Alignment: Great Lesson from Mentor',
      description: 'How a mentor\'s focus on precise language transformed my approach to leadership and team alignment. This insight explores the powerful impact that thoughtful communication can have on organizational success and personal growth.',
      icon: <HiLightBulb className="w-6 h-6" />,
      iconBg: 'bg-blue-500',
      gradient: 'from-blue-500 to-indigo-600',
      tags: [
        { name: 'Leadership', color: 'blue' },
        { name: 'Communication', color: 'indigo' }
      ],
      views: 356,
      link: '/insights/precision-and-alignment',
      image: '/images/precision-alignment.jpg'
    },
    {
      id: 2,
      date: 'April 7, 2025',
      title: 'The Rise of the AI Companion: From Interface to Intellect',
      description: 'Exploring how AI companions are evolving from simple interfaces to intellectual partners that understand context, emotions, and human needs.',
      icon: <HiSparkles className="w-5 h-5" />,
      iconBg: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      tags: [
        { name: 'AI Companions', color: 'emerald' },
        { name: 'Future Tech', color: 'teal' }
      ],
      views: 487,
      link: '/insights/ai-companion-evolution',
      image: '/images/ai-companion.jpg'
    },
    {
      id: 3,
      date: 'April 4, 2025',
      title: 'Chat Will Eat the World',
      description: 'How conversational interfaces are becoming the primary way we interact with technology and why this shift is transforming every industry.',
      icon: <HiSparkles className="w-5 h-5" />,
      iconBg: 'bg-purple-500',
      gradient: 'from-purple-500 to-fuchsia-600',
      tags: [
        { name: 'Conversational AI', color: 'purple' },
        { name: 'Future Tech', color: 'fuchsia' }
      ],
      views: 342,
      link: '/insights/chat-will-eat-the-world',
      image: '/images/chat-future.jpg'
    }
  ];
  
  const primaryArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);
  
  const getTagStyles = (color, isHovered) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border";
    
    const colorMap = {
      blue: isHovered 
        ? "bg-blue-500 text-white border-transparent" 
        : "bg-white/70 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30",
      indigo: isHovered 
        ? "bg-indigo-500 text-white border-transparent" 
        : "bg-white/70 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/30",
      emerald: isHovered 
        ? "bg-emerald-500 text-white border-transparent" 
        : "bg-white/70 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30",
      teal: isHovered 
        ? "bg-teal-500 text-white border-transparent" 
        : "bg-white/70 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/30",
      purple: isHovered 
        ? "bg-purple-500 text-white border-transparent" 
        : "bg-white/70 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30",
      fuchsia: isHovered 
        ? "bg-fuchsia-500 text-white border-transparent" 
        : "bg-white/70 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:border-fuchsia-800/30",
    };
    
    return `${baseClasses} ${colorMap[color]}`;
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-6 rounded-xl overflow-hidden mb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)"/>
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Moving Circle Animation */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row mb-8 items-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-4 sm:mb-0">
            <FaBookmark className="mr-2" /> Featured Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white sm:ml-6">
            Thinking Outloud
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Featured Article (1st column, spans 2 rows) */}
          <div 
            className="lg:col-span-2 lg:row-span-2 group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-white/20"
            style={{
              boxShadow: hoveredArticle === primaryArticle.id 
                ? '0 20px 50px -12px rgba(0, 0, 0, 0.3)' 
                : '0 10px 30px -12px rgba(0, 0, 0, 0.25)'
            }}
            onMouseEnter={() => setHoveredArticle(primaryArticle.id)}
            onMouseLeave={() => setHoveredArticle(null)}
          >

            
            <div className="h-full flex flex-col">
              {/* Image section */}
              <div className="h-56 md:h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                {primaryArticle.image && (
                  <img 
                    src={primaryArticle.image} 
                    alt={primaryArticle.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Date and views */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className={`${primaryArticle.iconBg} bg-opacity-20 text-white p-2.5 rounded-lg mr-3 transition-transform duration-300 group-hover:rotate-6`}
                    >
                      {primaryArticle.icon}
                    </div>
                    <span className="text-sm text-white/80 font-medium">
                      {primaryArticle.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-white/70 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{primaryArticle.views}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  {primaryArticle.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/80 mb-6 flex-grow">
                  {primaryArticle.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {primaryArticle.tags.map((tag) => (
                    <span 
                      key={tag.name} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                {/* Button */}
                <Link
                  href={primaryArticle.link}
                  className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300"
                >
                  Read article
                  <HiArrowLongRight className={`ml-2 transition-transform duration-300 ${hoveredArticle === primaryArticle.id ? 'translate-x-1' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Secondary Articles (3rd column) */}
          {secondaryArticles.map((article) => (
            <div 
              key={article.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-white/20"
              style={{
                boxShadow: hoveredArticle === article.id 
                  ? '0 15px 30px -10px rgba(0, 0, 0, 0.3)' 
                  : '0 5px 20px -10px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={() => setHoveredArticle(article.id)}
              onMouseLeave={() => setHoveredArticle(null)}
            >
              {/* Article image as background */}
              {article.image && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 z-10"></div>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-5 flex flex-col h-full relative z-10">
                {/* Date and icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className={`${article.iconBg} bg-opacity-20 text-white p-2 rounded-lg mr-3 transition-all duration-300 group-hover:rotate-6`}
                    >
                      {article.icon}
                    </div>
                    <span className="text-sm text-white/80 font-medium">
                      {article.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-white/70 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{article.views}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  {article.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/80 text-sm mb-4 flex-grow">
                  {article.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag.name} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white/30"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                {/* Button */}
                <Link
                  href={article.link}
                  className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Read article
                  <HiArrowLongRight className={`ml-2 transition-transform duration-300 ${hoveredArticle === article.id ? 'translate-x-1' : ''}`} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link
            href="/insights"
            className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg shadow-md font-medium transition-all duration-300"
          >
            View All Insights
            <HiArrowLongRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticlesHero;
