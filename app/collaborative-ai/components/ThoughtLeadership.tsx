'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowLongRight, HiCalendar, HiSparkles, HiBeaker, HiLightBulb } from 'react-icons/hi2';
import { Article } from '@/types/blog';
import ArticleCard from '@/components/blog/ArticleCard';

// Types for our thought leadership content
export type ThoughtLeadershipPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  image?: string;
};

interface ThoughtLeadershipProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Whether the section is visible (for animation) */
  isVisible?: boolean;
  /** Custom posts to display (optional) */
  customPosts?: ThoughtLeadershipPost[];
}

/**
 * ThoughtLeadership component for displaying thought leadership content
 */
export default function ThoughtLeadership({ 
  className = '', 
  isVisible = true,
  customPosts
}: ThoughtLeadershipProps) {
  // Default thought leadership content if none provided
  const defaultPosts: ThoughtLeadershipPost[] = [
    {
      title: "The Third Wave of Collaboration: Why AI + Human Teams Will Redefine Productivity",
      excerpt: "Exploring how collaboration has evolved from in-person to digital, and now to AI-augmented teamwork. This new paradigm represents a fundamental shift in how we work and create.",
      date: "April 5, 2025",
      slug: "third-wave-collaboration",
      category: "Future of Work",
      image: "/images/third-wave-collaboration.png"
    },
    {
      title: "The Invisible Integration: Why AI Should Feel Like a Natural Extension of Teams",
      excerpt: "Effective AI collaboration requires seamless integration into existing workflows. This article examines how interface design choices impact adoption and effectiveness.",
      date: "March 18, 2025",
      slug: "invisible-integration",
      category: "Design",
      image: "/images/invisible-integration.png"
    },
    {
      title: "Beyond the AI Assistant: The Coming Era of Collaborative Intelligence",
      excerpt: "Moving past the limited 'assistant' paradigm toward true collaborative partnerships between humans and AI systems with complementary capabilities.",
      date: "February 22, 2025",
      slug: "beyond-ai-assistant",
      category: "AI Research",
      image: "/images/beyond-ai-assistant.png"
    },
  ];

  // Use custom posts if provided, otherwise use default
  const thoughtLeadershipPosts = customPosts || defaultPosts;

  // Convert to Article type if ArticleCard is available
  const convertToArticle = (post: ThoughtLeadershipPost): Article => {
    return {
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      slug: post.slug,
      category: post.category,
      image: post.image,
      tags: [post.category]
    };
  };

  return (
    <section 
      id="insights" 
      className={`relative py-20 px-4 md:py-24
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
        transition-all duration-1000 ease-out delay-300 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Our perspectives on the evolving landscape of Collaborative AI
          </p>
        </div>
        
        {/* Insights Tiers Container */}
        <div className="space-y-12 stagger-fade-in">
          {/* FEATURED INSIGHT */}
          <div className="mac-glass p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
            
            {/* Tier Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                <HiSparkles className="mr-1.5" />
                FEATURED INSIGHT
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/5 lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-xl"></div>
                <Image
                  src={thoughtLeadershipPosts[0].image || "/images/blog/placeholder.jpg"}
                  alt={thoughtLeadershipPosts[0].title}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-lg w-full h-auto hover:scale-[1.03] transition-transform duration-300 relative z-10"
                />
              </div>
              <div className="w-full md:w-3/5 lg:w-1/2">
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">{thoughtLeadershipPosts[0].title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg">
                  {thoughtLeadershipPosts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">{thoughtLeadershipPosts[0].category}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                    <HiCalendar className="mr-1.5 w-4 h-4" />
                    {thoughtLeadershipPosts[0].date}
                  </span>
                </div>
                <div className="flex items-center">
                  <Link 
                    href={`/insights/${thoughtLeadershipPosts[0].slug}`} 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white h-10 py-2 px-4"
                  >
                    Read full article
                    <HiArrowLongRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* RECENT ARTICLES */}
          <div className="mac-glass p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
            
            {/* Tier Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                <HiBeaker className="mr-1.5" />
                RECENT ARTICLES
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {thoughtLeadershipPosts.slice(1).map((post, index) => (
                typeof ArticleCard === 'function' ? (
                  <ArticleCard
                    key={index}
                    article={convertToArticle(post)}
                    variant="compact"
                    showImage={true}
                    showCategory={true}
                    showDate={true}
                  />
                ) : (
                  <div key={index} className="mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-700/40 group hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]">
                    <div className="rounded-lg overflow-hidden shadow-sm mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 z-10"></div>
                      <Image
                        src={post.image || "/images/blog/placeholder.jpg"}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-500 transition-colors duration-300">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded-full text-sm font-medium">{post.category}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2.5 py-0.5 rounded-full text-sm font-medium inline-flex items-center">
                        <HiCalendar className="mr-1 w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <Link 
                      href={`/insights/${post.slug}`} 
                      className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center"
                    >
                      Read article
                      <HiArrowLongRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                )
              ))}
            </div>
          </div>
          
          {/* EXPLORE MORE */}
          <div className="mac-glass p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-teal-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
            
            {/* Tier Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                <HiLightBulb className="mr-1.5" />
                EXPLORE MORE
              </div>
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Discover More Insights</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Explore our complete collection of articles on AI collaboration, entrepreneurship, product vision, and the future of work. Gain valuable insights to help you navigate the rapidly evolving technological landscape.
              </p>
              <Link 
                href="/insights" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white h-10 py-2 px-8"
              >
                View All Insights
                <HiArrowLongRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
