'use client';

import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';
import { HiStar, HiLightBulb, HiBeaker } from 'react-icons/hi2';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';

const WorkingOnSection = () => {
  return (
    <Section background="light" spacing="md">
      <SectionTitle 
        title="What I'm Working On" 
        subtitle="A focused approach to impactful innovation"
      />
      
      {/* Focus Tiers Container */}
      <div className="space-y-12 stagger-fade-in">
        {/* PRIMARY FOCUS */}
        <div className="mac-glass p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
          
          {/* Tier Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
              <HiStar className="mr-1.5" />
              PRIMARY FOCUS
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/5 lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-xl"></div>
              <Image
                src="/images/social-active-collaboration-screen-shot.svg"
                alt="Sociail Platform Interface Preview"
                width={800}
                height={600}
                className="rounded-xl shadow-lg w-full h-auto hover:scale-[1.03] transition-transform duration-300 relative z-10"
              />
            </div>
            <div className="w-full md:w-3/5 lg:w-1/2">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">Sociail Platform</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg">
                My primary focus is building Sociail—a next-generation collaborative AI platform that seamlessly integrates into daily workflows, helping teams make better decisions and create innovative solutions together.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">AI</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm font-medium">Collaboration</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium">SaaS</span>
              </div>
              <div className="flex items-center">
                <Button 
                  href="/sociail" 
                  variant="primary"
                  size="lg"
                  icon={<HiArrowLongRight />}
                  className="hover:translate-x-1 transition-transform"
                >
                  Learn more about Sociail
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* ACTIVE PROJECTS */}
        <div className="mac-glass p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
          
          {/* Tier Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
              <HiBeaker className="mr-1.5" />
              ACTIVE PROJECTS
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-700/40 group hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]">
              <div className="rounded-lg overflow-hidden shadow-sm mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 z-10"></div>
                <Image
                  src="/images/devaiccelerate-website.png"
                  alt="DevAIccelerate Website Preview"
                  width={600}
                  height={300}
                  className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-500 transition-colors duration-300">DevAIccelerate</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                An innovation hub at the intersection of AI and developer experience. Tools, ideas, and experiments to help developers move faster with AI-assisted workflows.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded-full text-sm font-medium">DevTools</span>
                <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 px-2.5 py-0.5 rounded-full text-sm font-medium">AI Productivity</span>
              </div>
              <Button 
                href="https://www.devaiccelerate.com" 
                variant="secondary"
                size="sm"
                icon={<HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />}
                className="group hover:shadow-sm transition-all duration-300 text-blue-600 hover:text-blue-500"
              >
                Explore
              </Button>
            </div>
            
            <div className="mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 hover:border-blue-100 dark:hover:border-blue-700/40 group hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 p-6 mb-4 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 7.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-500 transition-colors duration-300">AI Ethics & Collaboration Network</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Leading discussions on ethical AI implementation and building a global network of researchers and practitioners exploring human-AI collaboration models.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded-full text-sm font-medium">Thought Leadership</span>
                <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 px-2.5 py-0.5 rounded-full text-sm font-medium">Ethics</span>
              </div>
              <Button 
                href="/collaborative-ai" 
                variant="secondary"
                size="sm"
                icon={<HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />}
                className="group hover:shadow-sm transition-all duration-300 text-blue-600 hover:text-blue-500"
              >
                Join the conversation
              </Button>
            </div>
          </div>
        </div>
        
        {/* PLANNED INITIATIVES */}
        <div className="mac-glass p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-teal-400/20 blur-xl rounded-full group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 ease-out"></div>
          
          {/* Tier Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
              <HiLightBulb className="mr-1.5" />
              PLANNED INITIATIVES
            </div>
          </div>
          
          <div className="mac-glass-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800/40 max-w-md ml-0 group hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] hover:border-green-100 dark:hover:border-green-700/40">
            <div className="rounded-lg bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40 p-8 mb-4 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/50 dark:bg-gray-800/50 blur-md rounded-full group-hover:bg-white/70 dark:group-hover:bg-gray-800/70 transition-all duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-center">
                    <span className="text-green-600 dark:text-green-400">Ide</span>
                    <span className="text-white bg-green-600 dark:bg-green-500 px-1.5 py-0.5 rounded group-hover:bg-green-500 dark:group-hover:bg-green-400 transition-colors duration-300">AI</span>
                    <span className="text-green-600 dark:text-green-400">Economy</span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-teal-500 transition-colors duration-300">IdeAIEconomy Thinktank</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
              A forward-thinking initiative exploring how AI transforms economic systems, work paradigms, and value creation in the digital age.
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2.5 py-0.5 rounded-full text-sm font-medium">Economics</span>
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 px-2.5 py-0.5 rounded-full text-sm font-medium">Future of Work</span>
            </div>
                          <div className="flex justify-start">
              <Button 
                href="#" 
                variant="outline"
                size="sm"
                icon={<HiArrowLongRight />}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                Coming soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkingOnSection;