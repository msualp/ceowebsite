'use client';

import { useEffect, useState } from 'react';
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
import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import InsightContent, { InsightData } from './InsightContent';

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
  const [insightData, setInsightData] = useState<InsightData | null>(null);
  
  // Extract the insight data from the server component
  useEffect(() => {
    const insightElement = document.querySelector('[data-insight]');
    if (insightElement) {
      const dataAttr = insightElement.getAttribute('data-insight');
      if (dataAttr) {
        try {
          const data = JSON.parse(dataAttr);
          setInsightData(data);
        } catch (error) {
          console.error('Error parsing insight data:', error);
        }
      }
    }
  }, []);
  
  if (!insightData) {
    return (
      <PageContainer title="Loading...">
        <div className="text-center py-12">Loading article...</div>
      </PageContainer>
    );
  }
  
  // Format date
  const formattedDate = new Date(insightData.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <PageContainer title={insightData.title}>
      {/* Server Component to fetch the data */}
      <InsightContent slug={slug} />
      
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{insightData.title}</h1>
        
        {insightData.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
            {insightData.excerpt}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white font-bold">
              {insightData.author?.charAt(0)}
            </div>
            <span>{insightData.author}</span>
          </div>
          
          <div className="flex items-center">
            <HiCalendar className="mr-2 w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <HiClock className="mr-2 w-4 h-4" />
            <span>{insightData.readTime}</span>
          </div>
          
          <div className="flex items-center">
            <HiTag className="mr-2 w-4 h-4" />
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {categories.find(c => c.id === insightData.category)?.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      {insightData.image && (
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12 shadow-lg">
          <Image 
            src={insightData.image}
            alt={insightData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Article Content */}
      <article>
        <div className="prose dark:prose-invert max-w-none lg:prose-lg">
          <div dangerouslySetInnerHTML={{ __html: insightData.content }} />
        </div>
      </article>
      
      {/* Social Sharing */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-2">
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(insightData.title)}&url=${encodeURIComponent(`https://mustafasualp.com/insights/${slug}`)}`}
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
            {insightData.author?.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">About {insightData.author}</h3>
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
