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
  tags?: string[];
}

export async function getInsights(category?: string): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'content/insights');
  const tagMapPath = path.join(process.cwd(), 'data', 'insights_article_tags.json');

  const files = fs.readdirSync(contentDir);
  const tagMap = JSON.parse(fs.readFileSync(tagMapPath, 'utf8'));

  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      const readTime = data.readTime || getReadingTime(content);
      const slug = file.replace('.mdx', '');

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category || 'ai-collaboration',
        author: data.author || 'Mustafa Sualp',
        readTime,
        image: data.image || null,
        tags: tagMap[file] || [],
      };
    })
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

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
