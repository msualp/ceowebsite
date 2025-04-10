import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PageContainer } from '@/components/PageContainer';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

function getInsights(): Post[] {
  const contentDir = path.join(process.cwd(), 'content/insights');
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
      };
    })
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  
  return posts;
}

export default function InsightsPage() {
  const posts = getInsights();

  return (
    <PageContainer title="Insights & Blog">
      <p className="text-lg mb-8">
        Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential.
      </p>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/insights/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {post.excerpt && <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>}
            <Link href={`/insights/${post.slug}`} className="inline-block mt-4 text-blue-600 hover:underline">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
