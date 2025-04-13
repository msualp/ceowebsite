'use client';

import { HiArrowLongRight, HiLightBulb, HiSparkles } from 'react-icons/hi2';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import InsightCard from '../InsightCard';
import Button from '../Button';

const InsightsSection = () => {
  return (
    <Section background="white" spacing="md">
      <SectionTitle 
        title="Latest Insights" 
        subtitle="Thoughts and perspectives on AI, leadership, and innovation"
      />
      
      <div className="mac-glass p-6 sm:p-8 rounded-2xl shadow-xl mb-12 border border-blue-50 dark:border-blue-900/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-green-400/10 to-blue-400/10 blur-2xl rounded-full"></div>
        
        {/* Featured tag */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
            <HiSparkles className="mr-1.5" />
            FEATURED PERSPECTIVES
          </div>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 stagger-fade-in">
          {/* First insight card */}
          <div className="mac-glass-card group p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-800/30 relative overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out delay-100"></div>
            
            <div className="flex flex-wrap items-center justify-between mb-3 relative">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3 transform group-hover:rotate-12 transition-transform duration-300">
                  <HiLightBulb className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">April 9, 2025</span>
              </div>
              
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-blue-600 group-hover:text-white inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                  Leadership
                </span>
                <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-purple-600 group-hover:text-white inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                  Communication
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Precision and Alignment: Great Lesson from Mentor
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 sm:line-clamp-2 md:line-clamp-3">
              How a mentor's focus on precise language transformed my approach to leadership and team alignment.
            </p>
            
            <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800/40 flex items-center justify-between">
              <Button
                href="/insights/precision-and-alignment"
                variant="text"
                size="sm"
                icon={<HiArrowLongRight className="transition-transform group-hover:translate-x-1" />}
                className="text-blue-600 dark:text-blue-400 group-hover:font-medium"
              >
                Read more
              </Button>
              
              <div className="flex items-center text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>356</span>
              </div>
            </div>
          </div>
          
          {/* Second insight card */}
          <div className="mac-glass-card group p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-green-100 dark:hover:border-green-800/30 relative overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-teal-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-green-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-teal-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out delay-100"></div>
            
            <div className="flex flex-wrap items-center justify-between mb-3 relative">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 p-2 rounded-lg mr-3 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">April 9, 2025</span>
              </div>
              
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-green-600 group-hover:text-white inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                  Startup
                </span>
                <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 px-2.5 py-1 rounded-full text-xs font-medium transition-all group-hover:bg-teal-600 group-hover:text-white inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1.5 group-hover:bg-white"></span>
                  EdTech
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Lessons from Bootstrapping AEFIS
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 sm:line-clamp-2 md:line-clamp-3">
              My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit.
            </p>
            
            <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800/40 flex items-center justify-between">
              <Button
                href="/insights/lessons-from-bootstrapping"
                variant="text"
                size="sm"
                icon={<HiArrowLongRight className="transition-transform group-hover:translate-x-1" />}
                className="text-green-600 dark:text-green-400 group-hover:font-medium"
              >
                Read more
              </Button>
              
              <div className="flex items-center text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>412</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Small pattern overlay - REMOVED */}

      </div>
      
      <div className="text-center fade-in-scroll">
        <Button 
          href="/insights" 
          variant="outline"
          size="lg"
          icon={<HiArrowLongRight />}
          className="px-8 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
        >
          View All Insights
        </Button>
      </div>
    </Section>
  );
};

export default InsightsSection;
