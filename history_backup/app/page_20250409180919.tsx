import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        {/* A background overlay for subtle swirl */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/30 dark:bg-black/40" />

        {/* Content container */}
        <div className="relative z-10 p-8 rounded-2xl bg-white/20 dark:bg-black/30 shadow-2xl flex flex-col items-center">
          <div className="w-32 h-32 mb-4 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Profile Image</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Mustafa Sualp</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            CEO & Founder, Sociail
          </p>
          <div className="flex space-x-4">
            <Link
              href="/sociail"
              className="px-4 py-2 rounded-md shadow-md bg-blue-600 text-white
                        transition-transform transform hover:scale-105 hover:bg-blue-500"
            >
              Explore Sociail
            </Link>
            <Link
              href="/journey"
              className="px-4 py-2 rounded-md shadow-md border border-white text-gray-800 dark:text-white
                        transition-transform transform hover:scale-105 hover:bg-white hover:text-gray-800"
            >
              My Journey
            </Link>
          </div>
        </div>
      </section>
      d
      {/* What I'm Working On Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>
      
      {/* Latest Insights Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
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
