'use client';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { CTAGroup } from '@/components/cta/CTAGroup';
import { 
  HiClock, 
  HiCalendar, 
  HiUser, 
  HiTag,
  HiArrowLeft
} from 'react-icons/hi2';
import { Share, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';

// Get reading time estimation
function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Get categories for the blog
const categories = [
  { id: 'all', name: 'All Articles' },
  { id: 'ai-collaboration', name: 'AI Collaboration' },
  { id: 'product-vision', name: 'Product Vision' },
  { id: 'entrepreneurship', name: 'Entrepreneurship' },
  { id: 'future-of-work', name: 'Future of Work' },
  { id: 'technical', name: 'Technical' },
];

// Use the Next.js page props type
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function InsightPage({ params }: Props) {
  const { slug } = params;
  const contentDir = path.join(process.cwd(), 'content/insights');
  
  // Try to find the file with the matching slug
  const files = fs.readdirSync(contentDir);
  const mdxFile = files.find(file => file.replace('.mdx', '') === slug);
  
  if (!mdxFile) {
    notFound();
  }
  
  const filePath = path.join(contentDir, mdxFile);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const readTime = data.readTime || getReadingTime(content);
  const category = data.category || 'ai-collaboration';
  const author = data.author || 'Mustafa Sualp';
  const image = data.image || '/images/blog/placeholder.jpg';
  
  // Format date
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get related articles (for future implementation)
  // This would ideally fetch articles with the same category or tags
  
  return (
    <PageContainer title={data.title}>
      {/* Back Link */}
      <Link 
        href="/insights" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 group transition-colors"
      >
        <HiArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all insights
      </Link>
      
      {/* Article Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{data.title}</h1>
        
        {data.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
            {data.excerpt}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white font-bold">
              {author.charAt(0)}
            </div>
            <span>{author}</span>
          </div>
          
          <div className="flex items-center">
            <HiCalendar className="mr-2 w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <HiClock className="mr-2 w-4 h-4" />
            <span>{readTime}</span>
          </div>
          
          <div className="flex items-center">
            <HiTag className="mr-2 w-4 h-4" />
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {categories.find(c => c.id === category)?.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      {image && (
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12 shadow-lg">
          <Image 
            src={image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Article Content */}
      <article>
        <div className="prose dark:prose-invert max-w-none lg:prose-lg">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </article>
      
      {/* Social Sharing */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-2">
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0072b1] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3b5998] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`https://mustafasualp.com/insights/${slug}`);
              alert('Link copied to clipboard!');
            }}
            className="bg-gray-600 dark:bg-gray-700 text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
            aria-label="Copy link"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* End of Article CTA */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-xl font-bold mb-4">Enjoyed this article?</h3>
        <p className="mb-6">
          Sociail is putting these ideas into practice. Be among the first to experience our collaborative AI platform.
        </p>
        <CTAGroup 
          variant="inline" 
          primaryCTA="earlyAccess" 
          secondaryCTA="custom"
          secondaryLabel="Explore More Insights" 
          secondaryHref="/insights" 
          secondaryIcon={<HiArrowLeft className="w-4 h-4" />}
        />
      </div>
      
      {/* Author Box */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
            {author.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">About {author}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Founder & CEO, Sociail</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Mustafa is a serial entrepreneur focused on reinventing human collaboration in the age of AI. 
          After a successful exit with AEFIS, an EdTech company, he now leads Sociail, building the next 
          generation of AI-powered collaboration tools.
        </p>
      </div>
    </PageContainer>
  );
}
