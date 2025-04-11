'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function MacHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Mustafa Sualp</div>
        <nav className="space-x-4">
  }

  return (
    <>
      {/* Fixed top navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Mustafa Sualp</div>

          {/* Right side: single hamburger (desktop + mobile) */}
          <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </header>

      {/* Backdrop covers the screen behind side menu */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={toggleMenu}
      />

      {/* Off-canvas side menu, slides in from the right */}
      <nav
        className={`
          fixed top-0 right-0 h-full w-64
          bg-white/70 dark:bg-black/40 backdrop-blur-md
          border-l border-gray-200 dark:border-gray-700
          z-50 transform transition-transform duration-300
          flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>

        <div className="p-4 space-y-4 flex-grow">
          <Link href="/about" onClick={toggleMenu} className="block hover:underline">
            About
          </Link>
          <Link href="/sociail" onClick={toggleMenu} className="block hover:underline">
            Sociail
          </Link>
          <Link href="/journey" onClick={toggleMenu} className="block hover:underline">
            Journey
          </Link>
          <Link href="/insights" onClick={toggleMenu} className="block hover:underline">
            Insights
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="block hover:underline">
            Contact
          </Link>
        </div>
        
        {/* Theme toggle at the bottom middle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
          <ThemeToggle />
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
