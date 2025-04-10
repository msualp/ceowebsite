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
    <header className="w-full border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          Mustafa Sualp
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
