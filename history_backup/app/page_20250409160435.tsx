import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        <div className="md:w-1/3 flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Profile Image</span>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Mustafa Sualp</h1>
          <h2 className="text-2xl text-blue-600 dark:text-blue-400 mb-6">CEO & Founder, Sociail</h2>
          <p className="text-lg mb-6">
            Creating the future of human-AI collaboration. Serial entrepreneur with a passion for 
            building technologies that enhance human potential.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/sociail" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Sociail
            </Link>
            <Link 
              href="/journey" 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
            >
              My Journey
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Latest Insights</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">
              <Link href="/insights/precision-and-alignment" className="text-blue-600 hover:underline">
                Precision and Alignment: Great Lesson from Mentor
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-3">April 9, 2025</p>
            <p className="mb-4">How a mentor's focus on precise language transformed my approach to leadership and team alignment.</p>
            <Link href="/insights/precision-and-alignment" className="text-blue-600 hover:underline">
              Read More →
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
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
        <div className="mt-6 text-center">
          <Link href="/insights" className="text-blue-600 hover:underline">
            View All Insights →
          </Link>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Current Focus</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Sociail: Real-Time Collaborative AI</h3>
          <p className="mb-6">
            At Sociail, we're building a platform that seamlessly integrates AI into daily workflows, 
            redefining how teams collaborate, make decisions, and create new solutions.
          </p>
          <Link 
            href="/sociail" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  )
}
