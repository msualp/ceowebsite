#!/usr/bin/env bash

# ------------------------------------------------------------
# Script: init-ceowebsite.sh
# Purpose: Create the directory structure and blank files
#          for a Next.js + Tailwind + Contentlayer + Netlify CMS project
# ------------------------------------------------------------

# Exit immediately if a command exits with a non-zero status
set -e

# Name of the root project folder
PROJECT_NAME="ceowebsite"

echo "Creating project folder: $PROJECT_NAME"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "Creating root-level files..."
touch .env.example
cat <<EOF > .gitignore
node_modules
.next
.env
dist
EOF

touch .eslintignore
touch .eslintrc.cjs
touch .prettierrc
touch jest.config.js
touch jest.setup.js
touch contentlayer.config.ts
touch next.config.js
touch package.json
touch postcss.config.js
touch tailwind.config.js
touch tsconfig.json

echo "Creating app directory structure..."
mkdir -p app
cat <<EOF > app/layout.tsx
/* app/layout.tsx (Blank) */
EOF

cat <<EOF > app/page.tsx
/* app/page.tsx (Blank) */
EOF

cat <<EOF > app/not-found.tsx
/* app/not-found.tsx (Blank) */
EOF

cat <<EOF > app/error.tsx
/* app/error.tsx (Blank) */
EOF

mkdir -p app/about
cat <<EOF > app/about/page.tsx
/* app/about/page.tsx (Blank) */
EOF

mkdir -p app/contact
cat <<EOF > app/contact/page.tsx
/* app/contact/page.tsx (Blank) */
EOF

mkdir -p app/insights/[slug]
cat <<EOF > app/insights/page.tsx
/* app/insights/page.tsx (Blank) */
EOF

cat <<EOF > app/insights/[slug]/page.tsx
/* app/insights/[slug]/page.tsx (Blank) */
EOF

mkdir -p app/resume
cat <<EOF > app/resume/page.tsx
/* app/resume/page.tsx (Blank) */
EOF

echo "Creating components directory..."
mkdir -p components
cat <<EOF > components/Header.tsx
/* components/Header.tsx (Blank) */
EOF

cat <<EOF > components/Footer.tsx
/* components/Footer.tsx (Blank) */
EOF

cat <<EOF > components/ThemeToggle.tsx
/* components/ThemeToggle.tsx (Blank) */
EOF

cat <<EOF > components/Mdx.tsx
/* components/Mdx.tsx (Blank) */
EOF

echo "Creating content directory..."
mkdir -p content/insights
cat <<EOF > content/insights/my-first-insight.mdx
---
title: "My First Insight"
date: "2025-01-01"
excerpt: "An introduction post."
---

Hello World! This is an MDX file for my first blog post.
EOF

cat <<EOF > content/insights/second-post.mdx
---
title: "Second Post"
date: "2025-02-15"
excerpt: "Another sample MDX post."
---

This is another MDX file. Add your content here.
EOF

echo "Creating public/admin for Netlify CMS..."
mkdir -p public/admin
cat <<EOF > public/admin/config.yml
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
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Body", name: "body", widget: "markdown" }
EOF

echo "Creating styles directory..."
mkdir -p styles
cat <<EOF > styles/global.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add global overrides or custom classes here */
EOF

echo "Creating test directory..."
mkdir -p __tests__
cat <<EOF > __tests__/Home.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })
})
EOF

echo "Done! Project scaffold created in: $PROJECT_NAME"

