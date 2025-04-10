import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Fixed for mobile responsiveness */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md bg-white/30 dark:bg-black/40 z-0" />

        {/* Responsive container that stacks on mobile, side-by-side on larger screens */}
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
          {/* Image container - Mobile first approach */}
          <div className="w-full md:w-2/5 h-[50vh] md:h-screen relative">
            {/* Image with absolute positioning */}
            <div className="absolute inset-0">
              <Image
                src="/images/Mustafa-Sualp-Sociail-BW.png"
                alt="Mustafa Sualp"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[center_66%]"
                priority
              />
            </div>
          </div>

          {/* Text container - Full width on mobile, 60% on desktop */}
          <div className="w-full md:w-3/5 flex items-center px-6 py-16 md:py-0 md:px-10 lg:px-20">
            <div className="text-left max-w-2xl mx-auto md:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-gray-900 dark:text-white">
                Rewiring Human Collaboration for the Age of AI
              </h1>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 md:mb-8">
                Built one company from code to exit. Now building the next — to reinvent how humans and AI collaborate, create, and thrive together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">
                <div className="relative">
                  <Link
                    href="/sociail"
                    className="relative inline-flex items-center justify-center gap-3 rounded-md px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm h-[52px] min-h-[52px] min-w-[270px] w-full"
                  >
                    Explore the Vision
                  </Link>
                </div>

                <div className="relative">
                  <Link
                    href="https://www.sociail.com"
                    className="relative inline-flex items-center justify-center gap-3 rounded-md px-6 py-3 h-[52px] min-h-[52px] text-base font-semibold text-gray-900 border border-gray-300 bg-white hover:bg-gray-100 transition shadow-sm min-w-[270px] w-full"
                  >
                    <Image
                      src="/images/sociail-logo-with-gray-stroke.svg"
                      alt="Sociail Logo"
                      width={32}
                      height={32}
                      className="h-6 w-auto opacity-90 pointer-events-none"
                      style={{ objectFit: 'contain' }}
                    />
                    <span>Join Early Access</span>
                  </Link>
                  <span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                    Limited Seats
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          As seen in: Philadelphia 100, HelioCampus, Drexel University, MIT AI, AEFIS
        </div>
      </section>

      {/* Mission Capsule */}
      <section className="bg-black dark:bg-white py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-mono text-green-400 dark:text-green-700 text-sm">
            &gt;&gt;&gt; mission.sh
          </div>
          <p className="mt-2 text-xl font-semibold text-white dark:text-black">
            Rewire how humans and AIs collaborate — with purpose, clarity, and creativity.
          </p>
        </div>
      </section>
      
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

      {/* Team Tribute Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="section-glass">
            <h2 className="text-3xl font-bold mb-6 text-center">My Team is My Superpower</h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center">
              Pictured here with the AEFIS team just days before the COVID-19 lockdown. 
              A difficult, transformative time — but also one of our most inspiring chapters. 
              I am forever grateful to those who helped shape that journey.
            </p>
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/20">
              <Image
                src="/images/Mustafa-Sualp-with-AEFIS-Team.png"
                alt="AEFIS Team Photo Before COVID"
                width={1200}
                height={600}
                className="w-full h-auto object-cover filter grayscale"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm md:text-base text-center px-4 py-3">
                AEFIS team, March 2020 — just days before the world changed.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
