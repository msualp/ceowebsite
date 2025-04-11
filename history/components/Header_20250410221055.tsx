'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  const toggleMenu = () => {
    console.log("Toggle menu clicked, current state:", isOpen)
    setIsOpen(!isOpen)
  }

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-medium' : 'hover:text-blue-600 transition-colors'
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
          <nav aria-label="Main navigation" className="hidden md:flex space-x-6 text-base font-medium text-gray-700 dark:text-gray-300">
            <Link href="/about" className={`${isActive('/about')} flex items-center gap-2 transition-colors hover:text-blue-600`}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
