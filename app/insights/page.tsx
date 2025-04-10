'use client';

import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import Image from 'next/image';
import LazyNewsletterForm from '@/components/lazy/LazyNewsletterForm';
import { initAllAnimations } from '@/lib/animation-utils';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import InsightCard from '@/components/InsightCard';
import Button from '@/components/Button';
import { HiArrowLongRight } from 'react-icons/hi2';
import { CTAGroup } from '@/components/cta/CTAGroup';

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
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
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
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-3">Connect with Mustafa</h4>
            <p className="text-sm mb-4">
              Interested in discussing AI collaboration or entrepreneurship?
            </p>
            <CTAGroup 
              variant="compact" 
              primaryCTA="calendly" 
              secondaryCTA="linkedin" 
              direction="column"
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-bold mb-3">About Sociail</h4>
            <p className="text-sm mb-4">
              Discover how we're redefining AI collaboration for teams.
            </p>
            <Button 
              href="/sociail" 
              variant="outline"
              size="sm"
              fullWidth
              className="mb-2"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

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
          <LazyNewsletterForm />
        </div>
      </Section>
    </PageContainer>
  );
}
