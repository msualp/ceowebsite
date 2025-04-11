'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Fixed top navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent hover:brightness-110 transition-all duration-300"
          >
            Mustafa Sualp
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Meet Mustafa
            </Link>
            <Link href="/sociail" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Sociail Vision
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-16">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                Meet Mustafa
              </Link>
              <Link
                href="/sociail"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                Sociail Vision
              </Link>
              <Link
                href="/journey"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                My Story
              </Link>
              <Link
                href="/insights"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                Thinking Aloud
              </Link>
              <Link
                href="/resume"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                Track Record
              </Link>
              <Link
                href="/contact"
                className="text-xl py-2 border-b border-gray-200 dark:border-gray-700"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="py-2 flex items-center">
                <span className="mr-2">Theme:</span>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
            href="/insights" 
            onClick={toggleMenu} 
            className={`block text-lg flex items-center gap-3 ${pathname === '/insights' ? 'text-blue-600 font-medium' : 'hover:underline'}`}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Thinking Aloud
          </Link>
          <Link 
            href="/resume" 
            onClick={toggleMenu} 
            className={`block text-lg flex items-center gap-3 ${pathname === '/resume' ? 'text-blue-600 font-medium' : 'hover:underline'}`}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Track Record
          </Link>
          <Link 
            href="/contact" 
            onClick={toggleMenu} 
            className={`block text-lg flex items-center gap-3 ${pathname === '/contact' ? 'text-blue-600 font-medium' : 'hover:underline'}`}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </Link>
        </div>
      </nav>
    </>
  )
}

/**
 * HamburgerButton: 3 bars that animate into an X when open.
 * - Made lines thicker, with rounded corners.
 * - Set text-black/dark:text-white so the bars remain visible.
 */
function HamburgerButton({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean
  toggleMenu: () => void
}) {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-label="Toggle Menu"
      className="
        relative
        w-8 h-6
        flex flex-col justify-between items-center
        text-black dark:text-white
      "
    >
      {/* Top bar */}
      <span
        className={`
          h-[3px] w-full bg-current rounded-md
          transition-transform duration-300
          ${isOpen ? 'rotate-45 translate-y-[10px]' : 'rotate-0 translate-y-0'}
        `}
      />
      {/* Middle bar */}
      <span
        className={`
          h-[3px] w-full bg-current rounded-md
          transition-all duration-300
          ${isOpen ? 'opacity-0' : 'opacity-100'}
        `}
      />
      {/* Bottom bar */}
      <span
        className={`
          h-[3px] w-full bg-current rounded-md
          transition-transform duration-300
          ${isOpen ? '-rotate-45 -translate-y-[10px]' : 'rotate-0 translate-y-0'}
        `}
      />
    </button>
  )
}
