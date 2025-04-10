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

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Get the current pathname to determine if we're on the contact page
  const headersList = await headers();
  const xPathname = headersList.get('x-pathname');
  const xUrl = headersList.get('x-url');
  const pathname = xPathname || xUrl || '';
  const isContactPage = pathname.includes('/contact');
  
  const scriptsToLoad: string[] = [];

  if (isContactPage && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    scriptsToLoad.push(`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`);
  }

  if (process.env.NEXT_PUBLIC_GA_ID) {
    scriptsToLoad.push(`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`);
  }

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
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
        {scriptsToLoad.map((src, index) => (
          <script key={index} src={src} async defer />
        ))}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
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
            {children}
          </ThemeWrapper>
        </ToastProvider>
      </body>
    </html>
  )
}
