'use client';

import Link from 'next/link';
import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PageContainer } from '@/components/PageContainer';
import Image from 'next/image';

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
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Simulate subscription success
    setSubscriptionStatus({
      submitted: true,
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
    
    // Reset form
    setEmail('');
  };

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
        
        {subscriptionStatus.submitted && subscriptionStatus.success ? (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
            <p>{subscriptionStatus.message}</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={handleSubscribe}>
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 rounded border ${emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} dark:bg-gray-800`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </PageContainer>
  );
  
}
