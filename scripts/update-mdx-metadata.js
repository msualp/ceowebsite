#!/usr/bin/env node

/**
 * This script updates all MDX files in the content/insights directory
 * to ensure they have consistent metadata fields.
 * 
 * It adds the following fields if they don't exist:
 * - category
 * - author
 * - image
 * - readTime (calculated based on content length)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Categories mapping based on content
const categoryMapping = {
  'beyond-ai-assistant.mdx': 'ai-collaboration',
  'building-on-open-source.mdx': 'technical',
  'chat-will-eat-the-world.mdx': 'product-vision',
  'edtech-to-ai-journey.mdx': 'entrepreneurship',
  'idea-economy.mdx': 'future-of-work',
  'invisible-integration.mdx': 'product-vision',
  'lessons-from-bootstrapping.mdx': 'entrepreneurship',
  'my-first-insight.mdx': 'ai-collaboration',
  'precision-and-alignment.mdx': 'entrepreneurship',
  'realtime-collective-intelligence.mdx': 'future-of-work',
  'serial-entrepreneur-dilemma.mdx': 'entrepreneurship',
  'third-wave-collaboration.mdx': 'ai-collaboration',
};

// Default image paths (you can update these with actual image paths)
const defaultImages = {
  'ai-collaboration': '/images/blog/ai-collaboration.jpg',
  'product-vision': '/images/blog/product-vision.jpg',
  'entrepreneurship': '/images/blog/entrepreneurship.jpg',
  'future-of-work': '/images/blog/future-of-work.jpg',
  'technical': '/images/blog/technical.jpg',
};

// Calculate reading time
function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Process all MDX files
function updateMdxFiles() {
  const contentDir = path.join(process.cwd(), 'content/insights');
  const files = fs.readdirSync(contentDir);
  
  let updatedCount = 0;
  
  files.filter(file => file.endsWith('.mdx')).forEach(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    let needsUpdate = false;
    
    // Add category if missing
    if (!data.category) {
      data.category = categoryMapping[file] || 'ai-collaboration';
      needsUpdate = true;
    }
    
    // Add author if missing
    if (!data.author) {
      data.author = 'Mustafa Sualp';
      needsUpdate = true;
    }
    
    // Add image if missing
    if (!data.image) {
      data.image = defaultImages[data.category] || '/images/blog/placeholder.jpg';
      needsUpdate = true;
    }
    
    // Add readTime if missing
    if (!data.readTime) {
      data.readTime = getReadingTime(content);
      needsUpdate = true;
    }
    
    // Update the file if changes were made
    if (needsUpdate) {
      const updatedFileContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedFileContent);
      updatedCount++;
      console.log(`Updated: ${file}`);
    }
  });
  
  console.log(`\nCompleted! Updated ${updatedCount} files.`);
}

// Run the update
updateMdxFiles();
