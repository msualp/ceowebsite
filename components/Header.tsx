'use client'
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiSparkles,
  HiRocketLaunch,
  HiLightBulb,
  HiChatBubbleLeftRight,
  HiDocumentText,
  HiEnvelope,
  HiQuestionMarkCircle,
  HiVideoCamera // Added import for HiVideoCamera
} from 'react-icons/hi2'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Header as HeaderLandmark, Navigation } from './Landmark'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-medium' : 'hover:text-blue-600 transition-colors'
  }

  return (
    <>
      {/* Fixed top navigation bar */}
      <HeaderLandmark className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-white/95 dark:bg-black/80 shadow-md shadow-black/10 dark:shadow-black/30" label="Site header">
      <div className="w-full max-w-[96%] lg:max-w-[97%] mx-auto flex items-center justify-between px-4 md:px-4 lg:px-4 xl:px-4 py-3">
      <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent hover:brightness-110 transition-all duration-300"
          >
            Mustafa Sualp
          </Link>

          {/* Always visible navigation items */}
          <Navigation label="Main navigation" className="hidden md:flex items-center space-x-6 text-base font-medium text-gray-700 dark:text-gray-300">
            <Link href="/about" className={`${isActive('/about')} flex items-center gap-2 transition-colors hover:text-blue-600`}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Meet Mustafa
            </Link>
            <Link href="/sociail" className={`hidden lg:flex ${isActive('/sociail')} items-center gap-2 transition-colors hover:text-blue-600`}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Sociail Vision
            </Link>
            <Link href="/insights" className={`hidden md:flex ${isActive('/insights')} items-center gap-2 transition-colors hover:text-blue-600`}>
              <HiLightBulb className="w-5 h-5" />
              Insights
            </Link>
          </Navigation>

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
      </HeaderLandmark>

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

      {/* Off-canvas side menu - Enhanced with grouping and visual hierarchy */}
      <Navigation
        id="main-menu"
        label="Main menu"
        className={`
          fixed top-0 right-0 h-full w-80
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
          border-l border-gray-200 dark:border-gray-700
          z-[105] transform transition-transform duration-300
          flex flex-col overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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

        <div className="p-4 space-y-6 flex-grow">
          {/* Home link */}
          <Link 
            href="/" 
            onClick={toggleMenu} 
            className={`block text-lg flex items-center gap-3 py-2 ${isActive('/')}`}
          >
            <HiHome className="w-5 h-5" />
            Home
          </Link>
          
          {/* About section */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-2">About Mustafa</h3>
            <div className="space-y-1 ml-1">
              <Link 
                href="/about" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/about')}`}
              >
                <HiUser className="w-5 h-5" />
                Meet Mustafa
              </Link>
              <Link 
                href="/journey" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/journey')}`}
              >
                <HiBriefcase className="w-5 h-5" />
                Professional Journey
              </Link>
            </div>
          </div>
          
          {/* Sociail section */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-2">Sociail</h3>
            <div className="space-y-1 ml-1">
              <Link 
                href="/sociail" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/sociail')}`}
              >
                <HiSparkles className="w-5 h-5" />
                Vision & Product
              </Link>
              <Link 
                href="/sociail#beta" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                <HiRocketLaunch className="w-5 h-5" />
                <span className="flex items-center gap-1">
                  Early Access
                  <span className="text-base text-gray-500 dark:text-gray-400">→</span>
                </span>
              </Link>
              <Link 
                href="/myaistartup" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/myaistartup')}`}
              >
                <HiVideoCamera className="w-5 h-5" />
                My AI Startup
              </Link>            </div>
          </div>
          
          {/* Insights section */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-2">Insights</h3>
            <div className="space-y-1 ml-1">
              <Link 
                href="/insights" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/insights')}`}
              >
                <HiLightBulb className="w-5 h-5" />
                Thinking Aloud
              </Link>
              <Link 
                href="/collaborative-ai" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${pathname?.startsWith('/insights/collaborative-ai') ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <HiChatBubbleLeftRight className="w-5 h-5" />
                AI Collaboration
              </Link>
              <Link 
                href="/resources" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${pathname?.startsWith('/insights/resources') ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <HiDocumentText className="w-5 h-5" />
                Resources
              </Link>
            </div>
          </div>
          
          {/* Contact link */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-2">Connect</h3>
            <div className="space-y-1 ml-1">
              <Link 
                href="/contact" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg ${isActive('/contact')}`}
              >
                <HiEnvelope className="w-5 h-5" />
                Contact Me
              </Link>
              <Link 
                href="/contact#speaking" 
                onClick={toggleMenu} 
                className={`block flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                <HiQuestionMarkCircle className="w-5 h-5" />
                Speaking Requests
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer with quick links */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/sualp/" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow transition-shadow"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="mailto:msualp@sociail.com" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow transition-shadow"
              aria-label="Email"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </a>
            <a 
              href="https://calendly.com/msualp" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow transition-shadow"
              aria-label="Schedule Meeting"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </Navigation>

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
      aria-expanded={isOpen}
      aria-controls="main-menu"
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
