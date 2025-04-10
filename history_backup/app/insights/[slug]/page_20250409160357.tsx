import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'

interface InsightPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/insights')
  const files = fs.readdirSync(contentDir)
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }))
}

export default function InsightPage({ params }: InsightPageProps) {
  const { slug } = params
  const contentDir = path.join(process.cwd(), 'content/insights')
  
  // Try to find the file with the matching slug
  const files = fs.readdirSync(contentDir)
  const mdxFile = files.find(file => file.replace('.mdx', '') === slug)
  
  if (!mdxFile) {
    notFound()
  }
  
  const filePath = path.join(contentDir, mdxFile)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto">
      <h1>{data.title}</h1>
      <p className="text-sm text-gray-500">
        Published on {new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      
      <div className="mt-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  )
}
