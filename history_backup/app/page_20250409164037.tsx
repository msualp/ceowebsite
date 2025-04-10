import Link from 'next/link'

export default function HomePage() {
  return (
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
      
      {/* Latest Insights Section */}
      <div className="relative z-10 mt-16 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Latest Insights</h2>
        <div className="grid md:grid-cols-2 gap-8 px-4">
          <div className="bg-white/70 dark:bg-black/30 p-6 rounded-lg shadow-sm backdrop-blur-sm">
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
          
          <div className="bg-white/70 dark:bg-black/30 p-6 rounded-lg shadow-sm backdrop-blur-sm">
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
    </section>
  )
}
