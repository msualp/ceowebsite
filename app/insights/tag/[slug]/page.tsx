'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import InsightCard from '@/components/InsightCard';
import Link from 'next/link';
import Button from '@/components/Button';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { Post } from '../../getInsights';

export default function TagPage() {
  const params = useParams();
  const tag = params.slug as string;
  const decodedTag = decodeURIComponent(tag);
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [recentTags, setRecentTags] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/insights');
        if (!response.ok) throw new Error('Failed to fetch insights');
        const data = await response.json();
        
        setPosts(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  useEffect(() => {
    // Store in recent history
    if (decodedTag) {
      const recentTags = JSON.parse(localStorage.getItem('recentTags') || '[]');
      const updated = [decodedTag, ...recentTags.filter(t => t !== decodedTag)].slice(0, 5);
      localStorage.setItem('recentTags', JSON.stringify(updated));
    }
  }, [decodedTag]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentTags') || '[]');
    setRecentTags(stored);
  }, []);
  
  const filtered = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!filtered.length) return;
      if (e.key === 'ArrowDown') {
        setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        const post = filtered[activeIndex];
        window.location.href = `/insights/${post.slug}`;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filtered, activeIndex]);
  
  return (
    <PageContainer title={`Articles tagged with "${decodedTag}"`}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            #{decodedTag}
          </h1>
          <Link href="/insights">
            <Button variant="ghost" size="sm" icon={<HiArrowLongLeft className="mr-1" />}>
              Back to All
            </Button>
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search within this tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm w-full"
        />
      </div>
      
      {recentTags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">Recent Tags:</span>
          {recentTags.map(tag => (
            <Link key={tag} href={`/insights/tag/${encodeURIComponent(tag)}`}>
              <span className="cursor-pointer hover:underline text-blue-600 dark:text-blue-400">#{tag}</span>
            </Link>
          ))}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12 transition-opacity duration-300">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 transition-all duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No matching insights found.
          </p>
          <Link href="/insights">
            <Button variant="outline" size="sm" className="mt-4">Browse All</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 transition-all duration-500 ease-in-out">
          {filtered.map((post, index) => (
            <div
              key={post.slug}
              className={`transition-all duration-500 ease-in-out rounded-md ${index === activeIndex ? 'ring-2 ring-blue-400' : ''}`}
            >
              <InsightCard
                title={post.title}
                date={formatDate(post.date)}
                excerpt={post.excerpt || ''}
                slug={post.slug}
                tags={post.tags}
              />
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
