import CMS from 'netlify-cms-app';
import ArticlePreview from './previews/ArticlePreview';
import { registerWidgets } from './widgets';

// Initialize the CMS
CMS.init();

// Register custom widgets
registerWidgets();

// Register the preview template for insights
CMS.registerPreviewTemplate('insights', ArticlePreview);

// Add custom styles for the CMS
const styles = `
  /* Light mode styles */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  /* Dark mode support for previews */
  .dark-mode .prose {
    color: #e5e7eb;
  }
  
  .dark-mode .prose h1,
  .dark-mode .prose h2,
  .dark-mode .prose h3,
  .dark-mode .prose h4,
  .dark-mode .prose h5,
  .dark-mode .prose h6 {
    color: #f3f4f6;
  }
  
  .dark-mode .prose a {
    color: #93c5fd;
  }
  
  .dark-mode .prose strong {
    color: #f3f4f6;
  }
  
  .dark-mode .prose code {
    color: #f3f4f6;
    background-color: #374151;
  }
  
  .dark-mode .prose blockquote {
    color: #d1d5db;
    border-left-color: #4b5563;
  }
  
  /* Toggle for dark mode */
  .dark-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    padding: 8px 12px;
    background-color: #1f2937;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
`;

// Add the styles to the head
const styleEl = document.createElement('style');
styleEl.innerHTML = styles;
document.head.appendChild(styleEl);

// Add dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.textContent = 'Toggle Dark Mode';
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Append the toggle button when the CMS is loaded
CMS.registerEventListener({
  name: 'preSave',
  handler: () => {
    if (!document.querySelector('.dark-mode-toggle')) {
      document.body.appendChild(darkModeToggle);
    }
  }
});
