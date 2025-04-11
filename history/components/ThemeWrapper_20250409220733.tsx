'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { ConsolidatedHeader } from './ConsolidatedHeader'
import { Footer } from './Footer'

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {/* Consolidated Header */}
      <ConsolidatedHeader />

      {/* Main content offset to account for fixed header */}
      <main className="pt-16">{children}</main>
      
      {/* Footer */}
      <Footer />
    </ThemeProvider>
  )
}
