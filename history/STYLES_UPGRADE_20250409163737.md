Below is a drop-in mini-template for a “Mac-inspired” Next.js + Tailwind layout. It includes:

app/layout.tsx using SF Pro fonts (via next/font/local)

app/page.tsx with a translucent Hero section example

components/MacHeader.tsx for a frosted top bar

styles/globals.css with some optional transitions

tailwind.config.js snippet to ensure typography & custom fonts

Pointers on where to place font files

You can copy-paste these into your existing Next.js (App Router) repo. Make sure you’ve already set up Tailwind (via create-next-app --tailwind --app, or manually). Remember to place your actual SF Pro font files in public/fonts/ (and possibly rename them).

1. app/layout.tsx
tsx
Copy
import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { MacHeader } from '@/components/MacHeader'

// 1) Register local SF Pro fonts
//    Adjust filenames & weights to match what you have in /public/fonts/.
const sfPro = localFont({
  src: [
    {
      path: '../public/fonts/SFProText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFProText-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    // Add more if needed (Medium, Bold, etc.)
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})

export const metadata = {
  title: 'Mac UI Inspired',
  description: 'A modern, Mac-like, frosted glass Next.js site',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sfPro.variable}>
      <body
        className="
          bg-gray-50
          dark:bg-gray-900
          text-gray-900
          dark:text-gray-100
          min-h-screen
          font-sans
          transition-colors
          duration-300
        "
      >
        <ThemeProvider attribute="class">
          {/* Mac-like Header */}
          <MacHeader />

          {/* Main content offset to account for fixed header */}
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
Notes
We set className={sfPro.variable} on the <html> element to reference that CSS variable.

The <body> has a transition-colors duration-300 for smooth color changes (e.g., dark/light).

2. app/page.tsx (Hero Example)
A translucent “hero” or landing section that demonstrates backdrop blur and glassmorphism:

tsx
Copy
export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      {/* A background overlay for subtle swirl */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/30 dark:bg-black/40" />

      {/* Content container */}
      <div className="relative z-10 p-8 rounded-2xl bg-white/20 dark:bg-black/30 shadow-2xl flex flex-col items-center">
        <img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-32 h-32 mb-4 rounded-full border-2 border-white object-cover"
        />
        <h1 className="text-4xl font-bold mb-2">Mustafa Sualp</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          CEO & Founder, Sociail
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="px-4 py-2 rounded-md shadow-md bg-blue-600 text-white
                       transition-transform transform hover:scale-105 hover:bg-blue-500"
          >
            Explore Sociail
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-md shadow-md border border-white text-white
                       transition-transform transform hover:scale-105 hover:bg-white hover:text-gray-800"
          >
            My Journey
          </a>
        </div>
      </div>
    </section>
  )
}
Notes
Adjust the src="/images/profile.jpg" path or remove it if you don’t have a profile pic.

The “frosted glass” effect comes from backdrop-blur-md + bg-white/30.

The dark:bg-black/40 changes in dark mode.

3. components/MacHeader.tsx
A fixed top navigation bar with a translucent background:

tsx
Copy
'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function MacHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Mustafa Sualp</div>
        <nav className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/social">Social</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {/* Dark/Light mode toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
fixed top-0 left-0 right-0 z-50: keeps the header pinned.

backdrop-blur-sm bg-white/60 dark:bg-black/30: translucent background that changes on dark mode.

border-b border-white/10: subtle dividing line.

4. components/ThemeToggle.tsx
A dark/light mode toggle using next-themes with sun/moon icons. If you prefer Apple-like icons, you can swap them.

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
      className="p-2 rounded hover:bg-white/20 transition-colors"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  )
}
Make sure to install heroicons if you want them:

bash
Copy
npm install @heroicons/react
5. styles/globals.css
A minimal example showing:

Tailwind base/components/utilities

Some custom root variables for transitions

css
Copy
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global overrides */
:root {
  --transition-all: 200ms cubic-bezier(0.25, 1, 0.5, 1);
}

/* Example body defaults (also in layout.tsx) */
body {
  margin: 0;
  padding: 0;
}

/* Example transitions for all elements */
*,
*::before,
*::after {
  transition: background-color var(--transition-all),
              color var(--transition-all),
              border-color var(--transition-all);
}
That last rule ensures color changes (light ↔ dark) happen smoothly. You can remove if you prefer more minimal transitions.

6. Updated tailwind.config.js (Excerpt)
Make sure your Tailwind config references the app & components directories, and sets up darkMode: 'class'. Optionally include @tailwindcss/typography for nicer text in blog posts.

js
Copy
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // references the SF Pro variable from layout.tsx
        sans: ['var(--font-sf-pro)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    // for advanced styling in MDX or blog posts
    require('@tailwindcss/typography'),
  ],
}
7. Font Placement (Important)
As noted in layout.tsx, you need your local SF Pro (or whichever Mac-like) font in public/fonts/, e.g.:

swift
Copy
public/fonts/
  SFProText-Regular.woff2
  SFProText-Semibold.woff2
  ...
If you don’t have SF Pro, you can fall back on system fonts or Google’s “Inter” font:

ts
Copy
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
Then reference inter.variable or inter.className.

8. Upgrading & Removing @next/font
If you haven’t done so already:

bash
Copy
# 1) Remove the old font package
npm uninstall @next/font

# 2) Upgrade Next to a version that supports next/font
npm install next@latest

# 3) Ensure your code uses 'next/font/local' or 'next/font/google'
Putting It All Together
After dropping these files in:

Ensure your project has "tailwindcss", "next-themes", "@heroicons/react", etc. in package.json.

Place your .woff2 or .woff SF Pro fonts in public/fonts.

Run npm run dev. Open http://localhost:3000.

You should see a frosted glass hero on the homepage, plus a pinned Mac-like header with a dark-mode toggle.

