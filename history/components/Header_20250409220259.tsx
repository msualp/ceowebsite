'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-medium' : 'hover:text-blue-600 transition-colors'
  }
  
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 dark:bg-black/30 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight font-[cursive] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent hover:brightness-110 transition-all duration-300"
        >
          Mustafa Sualp1
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex space-x-6">
          <Link href="/about" className={isActive('/about')}>
            About
          </Link>
          <Link href="/sociail" className={isActive('/sociail')}>
            Sociail
          </Link>
          <Link href="/journey" className={isActive('/journey')}>
            Journey
          </Link>
          <Link href="/insights" className={isActive('/insights')}>
            Insights
          </Link>
          <Link href="/resume" className={isActive('/resume')}>
            Resume
          </Link>
          <Link href="/contact" className={isActive('/contact')}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
