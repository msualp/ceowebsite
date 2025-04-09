import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'

// Custom MDX components
const mdxComponents = {
  // Example override for <a> tag
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a {...props} className="text-blue-600 hover:underline" />
  ),
  // You can add more custom components or shortcodes here
}

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return <Component components={mdxComponents} />
}
