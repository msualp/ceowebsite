# Font Loading Strategy

This document outlines the font loading strategy implemented for the CEO website to improve performance and prevent layout shifts.

## Overview

Font loading can significantly impact website performance and user experience. When fonts are not loaded efficiently, users may experience:

1. **Flash of Unstyled Text (FOUT)** - Text initially renders in a fallback font, then switches to the web font when loaded
2. **Flash of Invisible Text (FOIT)** - Text is invisible until the web font loads
3. **Layout shifts** - Content moves around as fonts load and render

Our strategy addresses these issues through a combination of techniques:

## Implemented Techniques

### 1. Font Preloading

We've added preload links for critical fonts to ensure they start loading as early as possible:

```html
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
```

Benefits:
- Tells the browser to download these fonts with high priority
- Prevents render-blocking by loading fonts in parallel with other resources
- Reduces time to first meaningful paint

### 2. Font Display Swap

We're using `font-display: swap` to ensure text remains visible while custom fonts load:

```javascript
// In app/layout.tsx
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sf-pro',
  display: 'swap',
})
```

Benefits:
- Text is immediately visible using fallback fonts
- Prevents invisible text during font loading
- Improves perceived performance

### 3. Self-Hosted Fonts

We've moved from relying solely on Google Fonts to self-hosting critical fonts:

- `/fonts/inter-var-latin.woff2` - Variable font version of Inter
- `/fonts/sf-pro-display-medium.woff2` - SF Pro Display Medium weight

Benefits:
- Eliminates third-party requests, reducing DNS lookups and connection overhead
- Provides more control over caching and delivery
- Improves privacy by eliminating third-party tracking

### 4. System Font Fallbacks

We've implemented a robust system font fallback stack:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

Benefits:
- Ensures text is displayed in a similar font even if web fonts fail to load
- Reduces layout shifts by choosing fallbacks with similar metrics
- Improves performance on devices that already have these fonts installed

### 5. Variable Fonts

For Inter, we're using the variable font format which combines multiple weights and styles into a single file:

Benefits:
- Reduces the number of font files needed
- Smaller overall file size compared to multiple individual font files
- Provides access to the full range of weights and styles

## Performance Impact

These improvements have a significant impact on performance:

- **Reduced Layout Shifts**: Preloading fonts and using font-display: swap minimizes content movement
- **Faster Rendering**: Critical fonts load earlier in the page lifecycle
- **Improved Core Web Vitals**: Particularly Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)

## Browser Support

- **Preload**: Supported in all modern browsers
- **Font-display: swap**: Supported in all modern browsers
- **Variable fonts**: Supported in all modern browsers except IE11
- **WOFF2 format**: Supported in all modern browsers except IE11

## Future Improvements

1. **Font Subsetting**: Further reduce font file sizes by including only the characters used on the site
2. **Font Loading API**: Consider using the Font Loading API for more precise control over font loading behavior
3. **Size Adjustments**: Fine-tune the font-size-adjust property to minimize layout shifts between fallback and web fonts

## Resources

- [Web.dev Guide to Font Best Practices](https://web.dev/font-best-practices/)
- [MDN Web Fonts Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
- [Google Fonts & Performance](https://web.dev/optimize-webfont-loading/)
