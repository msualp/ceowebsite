'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { ConsolidatedHeader } from './ConsolidatedHeader'
import { Footer } from './Footer'
import { CallToAction } from './CallToAction'

interface ThemeWrapperProps {
  children: ReactNode;
  hideCallToAction?: boolean;
}

export function ThemeWrapper({ 
  children,
  hideCallToAction = false
}: ThemeWrapperProps) {
  return (
    <ThemeProvider attribute="class">
      {/* Consolidated Header */}
      <ConsolidatedHeader />

      {/* Main content offset to account for fixed header */}
      <main className="pt-16">{children}</main>
      
      {/* Call to Action - only on pages that don't opt out */}
      {!hideCallToAction && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CallToAction />
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </ThemeProvider>
  )
}
