import { ReactNode } from 'react'
import '../styles/global.css'
import Link from 'next/link'

export const metadata = {
  title: 'Mustafa Sualp | CEO & Founder',
  description: 'Tech-forward, founder-focused, AI-aligned personal brand website',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex min-h-screen flex-col">
          <header className="w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
              <Link href="/" className="text-xl font-bold">
                Mustafa Sualp
              </Link>
              <nav aria-label="Main navigation" className="space-x-4">
                <Link href="/about">About</Link>
                <Link href="/sociail">Sociail</Link>
                <Link href="/journey">Journey</Link>
                <Link href="/insights">Insights</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="container mx-auto px-4 py-4 flex justify-between text-sm">
              <p>© {new Date().getFullYear()} Mustafa Sualp. All rights reserved.</p>
              <div className="space-x-2">
                <a
                  href="https://www.linkedin.com/in/sualp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Twitter
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
