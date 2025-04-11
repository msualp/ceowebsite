'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

// Define the InsightData type
export interface InsightData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readTime?: string;
  category?: string;
  author?: string;
  image?: string;
}

// Get reading time estimation
function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getInsightData(slug: string): Promise<InsightData> {
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
  
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
    readTime: data.readTime || getReadingTime(content),
    category: data.category || 'ai-collaboration',
    author: data.author || 'Mustafa Sualp',
    image: data.image || '/images/blog/placeholder.jpg'
  };
}
