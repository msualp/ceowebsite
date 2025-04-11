import '../styles/global.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Script from 'next/script'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { headers } from 'next/headers'
import { ToastProvider } from '@/components/ToastContext'
import { FloatingCTA } from '@/components/cta/FloatingCTA'
import SkipToContent from '@/components/SkipToContent'
import { WebVitalsTracker } from '@/components/WebVitalsTracker'
import { Main } from '@/components/Landmark'
import dynamic from 'next/dynamic'

// Dynamically import the development-only components
// This ensures they're only loaded in development mode
const DevAccessibilityTester = dynamic(
  () => import('@/components/dev/AccessibilityTester').then(mod => mod.DevAccessibilityTester),
  { ssr: false }
)

const DevContrastChecker = dynamic(
  () => import('@/components/dev/ContrastChecker').then(mod => mod.ContrastChecker),
  { ssr: false }
)

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

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Get the current pathname to determine if we're on the contact page
  const headersList = await headers();
  const xPathname = headersList.get('x-pathname');
  const xUrl = headersList.get('x-url');
  const pathname = xPathname || xUrl || '';
  const isContactPage = pathname.includes('/contact');

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/sf-pro-display-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Google Tag Manager - Load after page becomes interactive */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TRXBFF7P');
            `,
          }}
        />
        
        {/* Conditional reCAPTCHA loading for contact page */}
        {isContactPage && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            id="recaptcha-script"
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="ga-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRXBFF7P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ToastProvider>
          <ThemeWrapper hideCallToAction={isContactPage}>
            {/* Accessibility: Skip to content link */}
            <SkipToContent />
            
            {/* Web Vitals Tracking */}
            <WebVitalsTracker />
            
            <Main id="main-content" label="Main content">
              {children}
            </Main>
            
            <FloatingCTA primaryCTA="earlyAccess" />
            
            {/* Development-only tools */}
            {process.env.NODE_ENV === 'development' && (
              <>
                <DevAccessibilityTester />
                <DevContrastChecker />
              </>
            )}
          </ThemeWrapper>
        </ToastProvider>
      </body>
    </html>
  )
}
