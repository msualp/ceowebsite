'use client';

import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import InsightCard from '@/components/InsightCard';
import Button from '@/components/Button';
import { HiArrowLongRight } from 'react-icons/hi2';

// Define the Post type
interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

export default function InsightsPage() {
  // State for posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts and initialize animations
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/insights');
        if (!response.ok) throw new Error('Failed to fetch insights');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  return (
    <PageContainer title="Insights & Blog">
      <SectionTitle 
        title="Insights & Blog" 
        subtitle="Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential."
        className="mb-12"
      />
      
      {loading ? (
        <div className="text-center py-12">Loading insights...</div>
      ) : (
        <div className="space-y-8 stagger-fade-in">
          {posts.map((post) =>
            post.slug === 'second-post' ? null : (
              <InsightCard
                key={post.slug}
                title={post.title}
                date={new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                excerpt={post.excerpt || ''}
                slug={post.slug}
                className={posts.indexOf(post) % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/10' : ''}
              />
            )
          )}
        </div>
      )}

      <div className="relative mt-16 mb-12 max-w-4xl mx-auto fade-in-scroll">
        <div className="img-with-caption relative">
          <Image
            src="/images/we-are-all-students.png"
            alt="We Are All Students"
            width={800}
            height={400}
            className="w-full rounded-xl shadow-md"
          />
          <div className="caption-reveal">
            "We are all students." A mantra I live by as a devoted lifelong learner.
          </div>
        </div>
      </div>

      <Section background="light" spacing="md" className="mt-12 rounded-xl">
        <SectionTitle 
          title="Stay in the Loop" 
          subtitle="Join our newsletter to receive the latest insights on AI, leadership, and productivity."
          className="mb-6"
        />
        
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
      </Section>
    </PageContainer>
  );
}
