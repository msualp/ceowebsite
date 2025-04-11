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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Meet Mustafa
            </Link>
            <Link href="/sociail" className={`${isActive('/sociail')} flex items-center gap-2 transition-colors hover:text-blue-600`}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Sociail Vision
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {/* Hamburger menu - visible on all screen sizes */}
            <div className="relative z-[110]">
              <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Menu components - visible on all screen sizes when menu is open */}
      {/* Backdrop covers the screen behind side menu */}
      <div
        className={`
          fixed inset-0 z-[90] bg-black/50
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={toggleMenu}
      />

      {/* Off-canvas side menu, slides in from the right */}
      <nav
        className={`
          fixed top-0 right-0 h-full w-64
          bg-white/80 dark:bg-black/40 backdrop-blur-md
          border-l border-gray-200 dark:border-gray-700
          z-[105] transform transition-transform duration-300
          flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={toggleMenu}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 flex-grow">
          <Link 
            href="/about" 
            onClick={toggleMenu} 
            className={`block text-lg flex items-center gap-3 ${pathname === '/about' ? 'text-blue-600 font-medium' : 'hover:underline'}`}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
