import React from 'react'

// Custom MDX components
const mdxComponents = {
  // Example override for <a> tag
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a {...props} className="text-blue-600 hover:underline" />
  ),
  // You can add more custom components or shortcodes here
}

// Simple MDX renderer that uses dangerouslySetInnerHTML
// This is a placeholder until we set up proper MDX rendering with contentlayer
export function Mdx({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
