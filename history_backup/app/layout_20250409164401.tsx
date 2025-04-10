import '../styles/global.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { ThemeWrapper } from '@/components/ThemeWrapper'

// Use Inter font as a fallback for SF Pro
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sf-pro',
  display: 'swap',
})

export const metadata = {
  title: 'Mustafa Sualp | CEO & Founder',
  description: 'Tech-forward, founder-focused, AI-aligned personal brand website',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="
          bg-gray-50
          dark:bg-gray-900
          text-gray-900
          dark:text-gray-100
          min-h-screen
          font-sans
          transition-colors
          duration-300
        "
      >
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}
