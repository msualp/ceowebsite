'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function MacHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Mustafa Sualp</div>
        <nav className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/sociail">Sociail</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {/* Dark/Light mode toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
