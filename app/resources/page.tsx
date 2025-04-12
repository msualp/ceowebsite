'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { FaGithub, FaCode, FaBook, FaLaptopCode } from 'react-icons/fa';
import { HiArrowLongRight } from 'react-icons/hi2';

export default function ResourcesPage() {
  return (
    <PageContainer title="Resources">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of tools, templates, and resources to help you on your journey.
          </p>
        </div>

        {/* Open Source Project */}
        <div className="mac-glass p-8 rounded-xl shadow-xl mb-12 stagger-fade-in">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8">
            <div className="w-full md:w-2/5 lg:w-1/2 relative">
              <div className="aspect-video relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/social-active-collaboration-screen-shot.svg"
                  alt="CEO Website Template Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-purple-600/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaGithub className="text-white w-16 h-16" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5 lg:w-1/2">
              <h3 className="text-2xl font-bold mb-3">Open Source CEO Website</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This entire website is open source and available for you to use, modify, and build upon. 
                Fork the repository, customize it to your needs, and launch your own professional website in minutes.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded text-sm font-medium">Next.js</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2.5 py-0.5 rounded text-sm font-medium">Tailwind CSS</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2.5 py-0.5 rounded text-sm font-medium">React</span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 px-2.5 py-0.5 rounded text-sm font-medium">TypeScript</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://github.com/msualp/ceowebsite" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  View on GitHub
                </Link>
                <Link 
                  href="/take-it" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Learn More
                  <HiArrowLongRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Developer Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <FaLaptopCode className="text-blue-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Developer Resources</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A collection of tools, libraries, and resources for developers building AI-powered applications.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-0.5 rounded text-sm font-medium">AI</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2.5 py-0.5 rounded text-sm font-medium">Development</span>
            </div>
            <Link 
              href="/resources/developer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Explore Resources
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Thought Leadership */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <FaBook className="text-purple-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thought Leadership</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Articles, papers, and presentations on AI collaboration, the future of work, and building AI-powered companies.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2.5 py-0.5 rounded text-sm font-medium">AI Ethics</span>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-2.5 py-0.5 rounded text-sm font-medium">Leadership</span>
            </div>
            <Link 
              href="/insights"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Read Insights
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">More Resources Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm constantly adding new resources to help entrepreneurs, developers, and leaders navigate the AI landscape.
            Check back soon for more tools, templates, and insights.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition-colors"
          >
            Request a Resource
            <HiArrowLongRight className="ml-2" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
