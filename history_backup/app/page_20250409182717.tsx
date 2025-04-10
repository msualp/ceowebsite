import Link from 'next/link';
import Image from 'next/image';
import { HeroSection, SectionDivider } from '@/components/HeroSection';
import { BlobShape, WaveDivider } from '@/components/SvgShapes';
import { PageContainer } from '@/components/PageContainer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Mustafa Sualp"
        subtitle="CEO & Founder, Sociail"
        height="h-screen"
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            href="/sociail"
            className="px-6 py-3 rounded-md shadow-md bg-blue-600 text-white
                      transition-transform transform hover:scale-105 hover:bg-blue-500"
          >
            Explore Sociail
          </Link>
          <Link
            href="/journey"
            className="px-6 py-3 rounded-md shadow-md border border-white text-white
                      transition-transform transform hover:scale-105 hover:bg-white hover:text-gray-800"
          >
            My Journey
          </Link>
        </div>
      </HeroSection>
      
      {/* What I'm Working On Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        {/* Decorative blob shape */}
        <div className="absolute -top-24 -right-24 text-blue-200 dark:text-blue-900 opacity-30 pointer-events-none">
          <BlobShape />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">What I&apos;m Working On</h2>
          
          <div className="glass p-8 rounded-xl shadow-xl mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-700/80 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Sociail Platform</h3>
                <p className="mb-4">
                  Building a next-generation AI collaboration platform that seamlessly integrates into daily workflows, 
                  helping teams make better decisions and create innovative solutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full">AI</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs rounded-full">Collaboration</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs rounded-full">SaaS</span>
                </div>
                <Link href="/sociail" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Learn more →
                </Link>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-700/80 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">AI Ethics Initiative</h3>
                <p className="mb-4">
                  Leading a cross-industry initiative to establish ethical guidelines for AI development and deployment,
                  focusing on transparency, fairness, and human-centered design principles.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 text-xs rounded-full">Ethics</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-xs rounded-full">Policy</span>
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 text-xs rounded-full">Research</span>
                </div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Coming soon →
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider at the bottom */}
        <div className="text-blue-500 dark:text-blue-700 transform translate-y-1">
          <WaveDivider />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Insights</h2>
          
          <div className="glass p-8 rounded-xl shadow-xl mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50/70 dark:bg-gray-800/70 p-6 rounded-lg shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">
                  <Link href="/insights/precision-and-alignment" className="text-blue-600 hover:underline">
                    Precision and Alignment: Great Lesson from Mentor
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-3">April 9, 2025</p>
                <p className="mb-4">How a mentor&apos;s focus on precise language transformed my approach to leadership and team alignment.</p>
                <Link href="/insights/precision-and-alignment" className="text-blue-600 hover:underline">
                  Read More →
                </Link>
              </div>
              
              <div className="bg-gray-50/70 dark:bg-gray-800/70 p-6 rounded-lg shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">
                  <Link href="/insights/lessons-from-bootstrapping" className="text-blue-600 hover:underline">
                    Lessons from Bootstrapping AEFIS
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-3">April 9, 2025</p>
                <p className="mb-4">My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit.</p>
                <Link href="/insights/lessons-from-bootstrapping" className="text-blue-600 hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
