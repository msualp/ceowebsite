import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/PageContainer';

interface InsightPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/insights');
  const files = fs.readdirSync(contentDir);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

export default function InsightPage({ params }: InsightPageProps) {
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
  
  return (
    <PageContainer title={data.title}>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Published on {new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </PageContainer>
  );
}
