/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        // Apply basic CSP headers site-wide
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;
              connect-src 'self' https://www.google-analytics.com https://www.google.com https://www.gstatic.com;
              font-src 'self';
              frame-src https://www.googletagmanager.com https://www.google.com;
            `.replace(/\n\s+/g, ' ')
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
