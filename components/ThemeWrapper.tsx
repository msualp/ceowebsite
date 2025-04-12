'use client'

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Header } from './Header'
import { Footer } from './Footer'
import { FooterCallToAction } from './cta/FooterCallToAction'

interface ThemeWrapperProps {
  children: ReactNode;
  hideCallToAction?: boolean;
}

export function ThemeWrapper({ 
  children,
  hideCallToAction = false
}: ThemeWrapperProps) {
  // Add this to prevent hydration mismatch errors with theme
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {/* Header */}
      <Header />

      {/* Main content offset to account for fixed header */}
      <main className="pt-16">{children}</main>
      
      {/* Call to Action - only on pages that don't opt out */}
      {!hideCallToAction && <FooterCallToAction />}
      
      {/* Footer */}
      <Footer />
    </ThemeProvider>
  )
}
