'use client';

import { useState } from 'react';
import { HiArrowLongRight, HiLightBulb, HiSparkles } from 'react-icons/hi2';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import Button from '../Button';

const InsightsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const featuredInsight = {
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
    image: '/images/precision-alignment.jpg' // Add an actual image path here
  };

  const smallInsights = [
    {
      id: 2,
      date: 'April 9, 2025',
      title: 'Lessons from Bootstrapping AEFIS',
      description: 'My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      iconBg: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      tags: [
        { name: 'Startup', color: 'emerald' },
        { name: 'EdTech', color: 'teal' }
      ],
      views: 412,
      link: '/insights/lessons-from-bootstrapping'
    },
    {
      id: 3,
      date: 'April 3, 2025',
      title: 'AI for Executive Decision-Making',
      description: 'How modern AI tools are reshaping the executive decision-making process.',
      icon: <HiSparkles className="w-5 h-5" />,
      iconBg: 'bg-purple-500',
      gradient: 'from-purple-500 to-fuchsia-600',
      tags: [
        { name: 'AI', color: 'purple' },
        { name: 'Leadership', color: 'fuchsia' }
      ],
      views: 289,
      link: '/insights/ai-executive-decision-making'
    }
  ];

  const getTagStyles = (color: string, isHovered: boolean) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border";
    
    const colorMap: Record<string, string> = {
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
    <Section background="white" spacing="lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Latest Insights" 
          subtitle="Thoughts and perspectives on AI, leadership, and innovation"
          className="mb-12"
        />
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          {/* Featured Article (2/3 width) */}
          <div 
            className="lg:w-2/3 group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-500"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: hoveredCard === featuredInsight.id 
                ? `0 10px 40px -10px rgba(${featuredInsight.iconBg.includes('blue') ? '59, 130, 246' : '16, 185, 129'}, 0.3)` 
                : '0 2px 10px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={() => setHoveredCard(featuredInsight.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Featured badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                <HiSparkles className="mr-1.5 h-4 w-4" />
                FEATURED
              </div>
            </div>
            
            {/* Gradient background that appears on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${featuredInsight.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out pointer-events-none`}
            />
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Image section - would normally have a real image */}
              <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* This would be replaced with an actual image */}
                <div className="flex items-center justify-center h-full">
                  <HiLightBulb className="h-16 w-16 text-blue-500/30 dark:text-blue-400/30" />
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col h-full">
                {/* Date and views */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div 
                      className={`${featuredInsight.iconBg} bg-opacity-10 dark:bg-opacity-20 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg mr-3 transition-transform duration-300 group-hover:rotate-6 group-hover:bg-blue-500 group-hover:text-white`}
                    >
                      {featuredInsight.icon}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {featuredInsight.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{featuredInsight.views}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-300 ${hoveredCard === featuredInsight.id ? `bg-gradient-to-r ${featuredInsight.gradient} bg-clip-text text-transparent` : 'text-gray-900 dark:text-white'}`}>
                  {featuredInsight.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {featuredInsight.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredInsight.tags.map((tag) => (
                    <span 
                      key={tag.name} 
                      className={getTagStyles(tag.color, hoveredCard === featuredInsight.id)}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                {/* Button */}
                <Button
                  href={featuredInsight.link}
                  variant="text"
                  size="md"
                  icon={<HiArrowLongRight className={`ml-1.5 transition-transform duration-300 ${hoveredCard === featuredInsight.id ? 'translate-x-1' : ''}`} />}
                  className={`font-medium transition-all duration-300 ${
                    hoveredCard === featuredInsight.id 
                      ? `text-blue-600 dark:text-blue-400` 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Read article
                </Button>
              </div>
            </div>
          </div>
          
          {/* Smaller tiles container (1/3 width) */}
          <div className="lg:w-1/3 grid grid-rows-2 gap-6">
            {/* Map through the smaller insights */}
            {smallInsights.map((insight) => (
              <div 
                key={insight.id}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-500 h-full"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: hoveredCard === insight.id 
                    ? `0 10px 40px -10px rgba(${insight.iconBg.includes('emerald') ? '16, 185, 129' : '168, 85, 247'}, 0.3)` 
                    : '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={() => setHoveredCard(insight.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient background that appears on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out pointer-events-none`}
                />
                
                <div className="p-5 flex flex-col h-full">
                  {/* Date and icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div 
                        className={`${insight.iconBg} bg-opacity-10 dark:bg-opacity-20 p-2 rounded-lg mr-3 transition-all duration-300 group-hover:rotate-6`}
                        style={{
                          color: hoveredCard === insight.id 
                            ? 'white' 
                            : `var(--tw-${insight.iconBg.split('-')[1]}-500)`,
                          backgroundColor: hoveredCard === insight.id 
                            ? `var(--tw-${insight.iconBg.split('-')[1]}-500)` 
                            : `rgba(var(--tw-${insight.iconBg.split('-')[1]}-500-rgb), 0.1)`
                        }}
                      >
                        {insight.icon}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {insight.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{insight.views}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${hoveredCard === insight.id ? `bg-gradient-to-r ${insight.gradient} bg-clip-text text-transparent` : 'text-gray-900 dark:text-white'}`}>
                    {insight.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
                    {insight.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {insight.tags.map((tag) => (
                      <span 
                        key={tag.name} 
                        className={getTagStyles(tag.color, hoveredCard === insight.id)}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <Button
                    href={insight.link}
                    variant="text"
                    size="sm"
                    icon={<HiArrowLongRight className={`ml-1.5 transition-transform duration-300 ${hoveredCard === insight.id ? 'translate-x-1' : ''}`} />}
                    className={`font-medium transition-all duration-300 text-sm ${
                      hoveredCard === insight.id 
                        ? `text-${insight.iconBg.split('-')[1]}-600 dark:text-${insight.iconBg.split('-')[1]}-400` 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Read article
                  </Button>
                </div>
              </div>
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
