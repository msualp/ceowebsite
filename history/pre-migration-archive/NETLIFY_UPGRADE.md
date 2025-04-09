Below is an updated, more production-ready foundation that incorporates:

UI Polish & Accessibility (themed Tailwind typography, dark-mode icon toggle)

Better MDX Experience (using Contentlayer for typed frontmatter, MDX-based blog)

Code Quality (ESLint, Prettier, basic testing)

Security (environment variables, a basic Content Security Policy, auditing steps)

Netlify CMS integration (admin config)

NOTE: This is still a template. In real production, you’d further tailor the CSP, set up advanced tests, handle authentication for Netlify CMS, etc.

Below is a file-by-file guide. Copy/paste them into a fresh Next.js 13+ project (with App Router) or adapt into your existing structure.

Folder Structure
lua
Copy
ceowebsite/
├─ .env.example
├─ .eslintignore
├─ .eslintrc.cjs
├─ .prettierrc
├─ jest.config.js
├─ contentlayer.config.ts
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ about/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  ├─ insights/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ resume/
│  │  └─ page.tsx
│  ├─ not-found.tsx
│  └─ error.tsx
├─ components/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  └─ ThemeToggle.tsx
├─ content/
│  └─ insights/
│     ├─ my-first-insight.mdx
│     └─ second-post.mdx
├─ public/
│  └─ admin/
│     └─ config.yml
└─ styles/
   └─ global.css
1. Root Config & Scripts
package.json
jsonc
Copy
{
  "name": "ceowebsite",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build && contentlayer build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx --fix",
    "test": "jest",
    "contentlayer": "contentlayer build"
  },
  "dependencies": {
    "@next/font": "13.4.10",
    "contentlayer": "^0.2.0",
    "gray-matter": "^4.0.3",
    "next": "13.4.10",
    "next-themes": "^0.2.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "remark-gfm": "^3.0.1",
    "rehype-prism-plus": "^1.5.0",
    "tailwindcss": "^3.3.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.9",
    "@types/node": "18.16.3",
    "@types/react": "18.0.28",
    "@types/react-dom": "18.0.11",
    "@types/jest": "^29.5.2",
    "@types/gray-matter": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.38.0",
    "eslint-config-next": "^13.4.10",
    "jest": "^29.5.0",
    "postcss": "^8.4.23",
    "prettier": "^2.8.7",
    "typescript": "5.0.4"
  }
}
next.config.js
Integrates Contentlayer.

Adds a CSP header example.

Enables React Strict Mode.

js
Copy
/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        // Apply basic CSP headers site-wide
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'none'; connect-src 'self'; font-src 'self';`,
          },
        ],
      },
    ]
  },
})
contentlayer.config.ts
Defines a typed MDX document model (e.g., “Insight”). All .mdx files in content/insights become typed data you can import from contentlayer/generated.

ts
Copy
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

export const Insight = defineDocumentType(() => ({
  name: 'Insight',
  filePathPattern: `insights/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath, // e.g. "my-first-insight"
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Insight],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})
tailwind.config.js
Enables typography plugin for nicer content styling.

js
Copy
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
}
postcss.config.js
js
Copy
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
.env.example
Use this to show environment variables. Never commit real secrets in .env.

ini
Copy
# EXAMPLE ENV VARS
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
API_KEY=super-secret-api-key
ESLint / Prettier / Jest
.eslintrc.cjs
cjs
Copy
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    // Example: allow unused vars if underscore prefixed
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
.eslintignore
lua
Copy
node_modules
.next
dist
.prettierrc
json
Copy
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5"
}
jest.config.js
A minimal Jest config for testing React/TypeScript:

js
Copy
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
jest.setup.js
js
Copy
// Optional: custom global mocks or test setup
import '@testing-library/jest-dom'
2. App Directory & Pages
app/layout.tsx
Imports global.css

Wraps app in ThemeProvider for dark mode

Basic <html> structure with reactStrictMode

tsx
Copy
import { ReactNode } from 'react'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// For SEO metadata, you can define a generateMetadata() if you want dynamic meta
export const metadata = {
  title: 'CEO Personal Brand',
  description: 'Tech-forward, founder-focused, AI-aligned website',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
app/page.tsx (Homepage)
tsx
Copy
export default function HomePage() {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold">Welcome to My CEO Website</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Showcasing my journey, insights, and more.
      </p>
    </section>
  )
}
app/not-found.tsx & app/error.tsx (Optional 404/500)
app/not-found.tsx:

tsx
Copy
export default function NotFound() {
  return (
    <div className="text-center my-20">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2">Sorry, we couldn’t find what you were looking for.</p>
    </div>
  )
}
app/error.tsx:

tsx
Copy
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="text-center my-20">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}
Other Example Pages
tsx
Copy
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p>I’m a tech founder building AI-powered solutions.</p>
    </div>
  )
}
tsx
Copy
// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p>Let’s work together or chat about new opportunities!</p>
    </div>
  )
}
tsx
Copy
// app/resume/page.tsx
export default function ResumePage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>My Resume</h1>
      <p>Download my official resume or see highlights below.</p>
      {/* Add real data as desired */}
    </article>
  )
}
3. Blog (Insights) Using Contentlayer
Contentlayer will scan content/insights/*.mdx, parse frontmatter, and generate typed data in .contentlayer/generated. We can import them for listing & reading.

app/insights/page.tsx
List all insights:

tsx
Copy
import { allInsights } from 'contentlayer/generated'
import Link from 'next/link'

export default function InsightsPage() {
  // Sort by date descending
  const posts = allInsights.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Insights & Blog</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/insights/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">
              ({new Date(post.date).toLocaleDateString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
app/insights/[slug]/page.tsx
Render a single post using the .mdx compiled by Contentlayer.

tsx
Copy
import { notFound } from 'next/navigation'
import { allInsights } from 'contentlayer/generated'
import { Mdx } from '@/components/Mdx'

interface InsightPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return allInsights.map((post) => ({ slug: post.slug }))
}

export default function InsightPage({ params }: InsightPageProps) {
  const slug = params.slug
  const post = allInsights.find((insight) => insight.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        Published on {new Date(post.date).toLocaleDateString()}
      </p>
      {/* Render MDX content with custom components */}
      <Mdx code={post.body.code} />
    </article>
  )
}
4. Content
content/insights/my-first-insight.mdx
mdx
Copy
---
title: "My First Insight"
date: "2025-01-01"
excerpt: "An introduction to MDX content in my blog."
---

Hello from my first MDX post! 

**Key ideas**:
- AI is changing the world
- Founders should adapt quickly
content/insights/second-post.mdx
mdx
Copy
---
title: "Second Post on Growth"
date: "2025-02-15"
excerpt: "Taking a deep dive into growth strategies."
---

> "Growth is never by mere chance..."

1. Product-market fit
2. Marketing & distribution
3. Scaling teams
5. Components
components/Header.tsx
Accessible nav.

Uses a ThemeToggle with sun/moon icons.

tsx
Copy
'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          CEO Branding
        </Link>
        <nav aria-label="Main navigation" className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
components/ThemeToggle.tsx
Simple dark/light icon toggle using next-themes:

tsx
Copy
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  )
}
Note: We use @heroicons/react for the icons. Add it if you want:

bash
Copy
npm install @heroicons/react
components/Footer.tsx
tsx
Copy
export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 py-4 flex justify-between text-sm">
        <p>© {new Date().getFullYear()} My CEO Brand</p>
        <div className="space-x-2">
          <a
            href="https://twitter.com/..."
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/..."
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
components/Mdx.tsx
A helper to render Contentlayer’s compiled MDX code. We can wrap in MDXContent or use <useMDXComponent>. Below is a minimal approach:

tsx
Copy
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
6. Global Styles
styles/global.css
css
Copy
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Typography plugin enhancements */
@layer base {
  /* Example body style overrides */
  body {
    @apply antialiased;
  }
}

/* You can add global overrides or custom classes here */
7. Netlify CMS
public/admin/config.yml
A minimal example for Netlify CMS with MDX. In real usage, set up Netlify Identity or Git Gateway to authenticate.

yaml
Copy
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "insights"
    label: "Insights"
    folder: "content/insights"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Excerpt", name: "excerpt", widget: "text", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
When you deploy on Netlify, you’ll access the CMS at /admin.

8. Basic Testing Example
Create a simple test in __tests__/Home.test.tsx:

tsx
Copy
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText(/Welcome to My CEO Website/i)).toBeInTheDocument()
  })
})
Make sure you have @testing-library/react installed if you want to do React component tests:

bash
Copy
npm install --save-dev @testing-library/react @testing-library/jest-dom
Run tests with:

bash
Copy
npm run test
9. Security & Auditing
Environment variables: Place real secrets in .env (gitignored).

Audit dependencies**:

bash
Copy
npm audit
Fix or upgrade if vulnerabilities are found.

CSP: We provided a basic Content Security Policy in headers(). Tailor it to your needs.

HTTPS: Netlify or Vercel handle TLS automatically.

10. Local Dev & Deployment
Local:

bash
Copy
npm install
npm run dev
Visit http://localhost:3000.

Production Build:

bash
Copy
npm run build
npm start
Netlify:

Link your repo on Netlify.

Build command: npm run build

Publish directory: .next (Netlify auto-detects Next).

Netlify CMS: set up Identity & Git Gateway for /admin.

Vercel:

Import your GitHub repo.

Vercel auto-detects Next.js with Contentlayer.

Conclusion
You now have a fully featured, more secure, more polished Next.js 13+ + Tailwind + Contentlayer + Netlify CMS starter:

Dark Mode with icon toggles

Typed MDX using Contentlayer

ESLint / Prettier for consistent code

Jest for basic tests

CSP for security basics

Netlify CMS for in-browser editing

Use this scaffold as your foundation to build a production-ready, AI-savvy personal brand website. Happy coding!






