/**
 * Meta Descriptions
 * 
 * This file contains meta descriptions for all pages on the website.
 * Each description should be between 120-160 characters for optimal SEO.
 * 
 * Guidelines for good meta descriptions:
 * 1. Keep between 120-160 characters
 * 2. Be descriptive and accurate
 * 3. Include relevant keywords
 * 4. Be unique for each page
 * 5. Avoid duplicate content
 * 6. Include a call to action when appropriate
 */

interface PageMetaData {
  title: string;
  description: string;
}

type PageMetaDataMap = {
  [key: string]: PageMetaData;
};

/**
 * Meta descriptions for all pages
 * The key is the pathname (e.g., '/' for homepage, '/about' for about page)
 */
export const PAGE_META_DATA: PageMetaDataMap = {
  // Home page
  '/': {
    title: 'Mustafa Sualp - CEO & Founder of Sociail',
    description: 'Discover Mustafa Sualp\'s journey as a tech entrepreneur and CEO of Sociail. Explore his vision for collaborative AI and the future of work in the digital age.',
  },
  
  // About page
  '/about': {
    title: 'About Mustafa Sualp | Background & Vision',
    description: 'Learn about Mustafa Sualp\'s background, professional journey, and vision for technology. From his early career to founding Sociail, discover what drives his innovation.',
  },
  
  // Journey page
  '/journey': {
    title: 'Professional Journey | Mustafa Sualp',
    description: 'Explore Mustafa Sualp\'s professional timeline, from his education at Drexel University to founding Sociail. Discover key milestones and achievements in his career.',
  },
  
  // Sociail page
  '/sociail': {
    title: 'Sociail | Collaborative AI Platform',
    description: 'Discover Sociail, a real-time collaborative AI platform that redefines how modern teams create, decide, and deliver. Learn about the vision and technology behind Sociail.',
  },
  
  // Insights page
  '/insights': {
    title: 'Insights & Thoughts | Mustafa Sualp',
    description: 'Read Mustafa Sualp\'s insights on technology, entrepreneurship, and the future of work. Explore articles on AI, collaboration, and digital transformation.',
  },
  
  // Contact page
  '/contact': {
    title: 'Contact Mustafa Sualp',
    description: 'Get in touch with Mustafa Sualp for speaking engagements, partnership opportunities, or media inquiries. Connect directly through the contact form or social media.',
  },
  
  // Resume page
  '/resume': {
    title: 'Resume & Experience | Mustafa Sualp',
    description: 'View Mustafa Sualp\'s professional resume, including his experience as CEO of Sociail, educational background, skills, and notable achievements in the tech industry.',
  },
  
  // Collaborative AI page
  '/collaborative-ai': {
    title: 'Collaborative AI | Mustafa Sualp',
    description: 'Explore Mustafa Sualp\'s perspective on collaborative AI and how it\'s transforming the workplace. Learn about the integration of AI in team collaboration tools.',
  },
  
  // Default (fallback) meta data
  'default': {
    title: 'Mustafa Sualp - CEO & Founder of Sociail',
    description: 'Mustafa Sualp is a serial entrepreneur and technology executive with a proven track record of building and scaling innovative software companies.',
  },
};

/**
 * Get meta data for a specific page
 * @param pathname The pathname of the page
 * @returns The meta data for the page, or the default meta data if not found
 */
export function getPageMetaData(pathname: string): PageMetaData {
  return PAGE_META_DATA[pathname] || PAGE_META_DATA['default'];
}
