import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import Image from 'next/image';
import { getInsights } from './getInsights';
import NewsletterForm from '@/components/NewsletterForm';

export default async function InsightsPage() {
  const posts = await getInsights();

  return (
    <PageContainer title="Insights & Blog">
      {/* <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">Insights & Blog</h1> */}
      <p className="text-lg mb-8">
        Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential.
      </p>
      
      <div className="space-y-8">
        {posts.map((post) =>
          post.slug === 'second-post' ? null : (
            <div
              key={post.slug}
              className={`border-b border-gray-200 dark:border-gray-700 pb-8 rounded-lg p-4 ${
                posts.indexOf(post) % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/10' : ''
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/insights/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {post.excerpt && <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>}
              <Link href={`/insights/${post.slug}`} className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Read More →
              </Link>
            </div>
          )
        )}
      </div>
      <div className="relative mt-16 mb-12 max-w-4xl mx-auto">
        <Image
          src="/images/we-are-all-students.png"
          alt="We Are All Students"
          width={800}
          height={400}
          className="rounded-xl shadow-md w-full object-cover grayscale"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          “We are all students.” A mantra I live by as a devoted lifelong learner.
        </div>
      </div>
      <section className="mt-20 text-center bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Stay in the Loop</h2>
        <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">Join our newsletter to receive the latest insights on AI, leadership, and productivity.</p>
        
        <NewsletterForm />
      </section>
    </PageContainer>
  );
  
}
