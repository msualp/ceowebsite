import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function generateCSP(nonce: string) {
  return [
    `default-src 'self';`,
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com;`,
    `style-src 'self' 'unsafe-inline';`,
    `img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;`,
    `connect-src 'self' https://www.google-analytics.com https://www.google.com https://www.gstatic.com;`,
    `font-src 'self';`,
    `frame-src https://www.googletagmanager.com https://www.google.com;`
  ].join(' ')
}

export function middleware(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64')
  const response = NextResponse.next()

  const reportTo = {
    group: 'csp-endpoint',
    max_age: 10886400,
    endpoints: [
      { url: 'https://yourdomain.com/api/csp-violation' }
    ],
    include_subdomains: true,
  }

  response.headers.set('Content-Security-Policy', generateCSP(nonce))
  response.headers.set('Content-Security-Policy-Report-Only', generateCSP(nonce) + ` report-to csp-endpoint;`)
  response.headers.set('Report-To', JSON.stringify(reportTo));
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('x-nonce', nonce)

  return response
}