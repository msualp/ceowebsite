'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { MacHeader } from './MacHeader'

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {/* Mac-like Header */}
      <MacHeader />

      {/* Main content offset to account for fixed header */}
      <main className="pt-16">{children}</main>
    </ThemeProvider>
  )
}
