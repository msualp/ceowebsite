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
