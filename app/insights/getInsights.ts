import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readTime?: string;
  image?: string;
}

export async function getInsights(category?: string): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'content/insights');
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Calculate reading time if not provided
      const readTime = data.readTime || getReadingTime(content);
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category || 'ai-collaboration', // Default category
        author: data.author || 'Mustafa Sualp', // Default author
        readTime,
        image: data.image || null,
      };
    })
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  
  // Filter by category if provided
  if (category && category !== 'all') {
    return posts.filter(post => post.category === category);
  }
  
  return posts;
}

// Get reading time estimation
function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
