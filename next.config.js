const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        // Apply comprehensive CSP headers site-wide
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.googletagmanager.com;
              script-src-elem 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.googletagmanager.com https://www.google-analytics.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://www.google-analytics.com;
              font-src 'self';
              connect-src 'self' https://www.google-analytics.com;
              frame-src 'self' https://www.google.com/recaptcha/;
              frame-ancestors 'self';
              form-action 'self';
              base-uri 'self';
              object-src 'none';
              media-src 'none';
              manifest-src 'self';
              upgrade-insecure-requests;
              block-all-mixed-content;
            `.replace(/\s+/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig);
