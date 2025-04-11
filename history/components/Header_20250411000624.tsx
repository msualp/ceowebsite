'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState)
  }
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-medium' : 'hover:text-blue-600 transition-colors'
  }

  return (
    <>
      {/* Fixed top navigation bar */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-500 delay-150 ${isVisible ? 'translate-y-0' : '-translate-y-full'} backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent hover:brightness-110 transition-all duration-300"
          >
            Mustafa Sualp
          </Link>

          {/* Always visible navigation items */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-6 text-base font-medium text-gray-700 dark:text-gray-300">
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
            <div className="flex items-center bg-gray-200/50 dark:bg-gray-800/50 rounded-full p-1">
              <ThemeToggle />
            </div>
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
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      />

      {/* Off-canvas side menu, slides in from the right */}
      <nav
        className={`
          fixed top-0 right-0 h-full w-64
          bg-white/80 dark:bg-black/40 backdrop-blur-md
          border-l border-gray-200 dark:border-gray-700
          z-[9999] transform transition-transform duration-300
          flex flex-col
          ${isOpen ? '!translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
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
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/about' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Meet Mustafa
          </Link>
          <Link 
            href="/sociail" 
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/sociail' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/sociail' ? 'page' : undefined}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Sociail Vision
          </Link>
          <Link 
            href="/journey" 
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/journey' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/journey' ? 'page' : undefined}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            My Story
          </Link>
          <Link 
            href="/insights" 
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/insights' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/insights' ? 'page' : undefined}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Thinking Aloud
          </Link>
          <Link 
            href="/resume" 
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/resume' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/resume' ? 'page' : undefined}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Track Record
          </Link>
          <Link 
            href="/contact" 
            onClick={(e) => {
              toggleMenu();
            }} 
            className={`block text-lg flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${pathname === '/contact' ? 'text-blue-600 font-medium' : 'hover:underline'} cursor-pointer`}
            aria-current={pathname === '/contact' ? 'page' : undefined}
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
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
      aria-label="Toggle Menu"
      aria-expanded={isOpen}
      className="
        relative
        w-8 h-6
        flex flex-col justify-between items-center
        text-black dark:text-white
        cursor-pointer
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
