import '../styles/global.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { headers } from 'next/headers'
import { ToastProvider } from '@/components/ToastContext'

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
  // Get the current pathname to determine if we're on the contact page
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
  const isContactPage = pathname.includes('/contact');
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900
          text-gray-900
          dark:text-gray-100
          min-h-screen
          font-sans
          transition-colors
          duration-300
        "
      >
        <ToastProvider>
          <ThemeWrapper hideCallToAction={isContactPage}>
            {children}
          </ThemeWrapper>
        </ToastProvider>
      </body>
    </html>
  )
}
