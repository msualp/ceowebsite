// EmailSummaryGenerator.tsx
'use client';

import React, { useState } from 'react';
import { UseCase, SectionName, ColorName, colorClasses } from './types';

interface EmailSummaryGeneratorProps {
  selectedUseCases: UseCase[];
  userNotes: {[key: string]: string};
  onClose: () => void;
}

const EmailSummaryGenerator: React.FC<EmailSummaryGeneratorProps> = ({ 
  selectedUseCases, 
  userNotes, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  
  // Format current date for the summary
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get category color
  const getCategoryColor = (category: SectionName): ColorName => {
    switch (category) {
      case 'personal': return 'blue';
      case 'teams': return 'purple';
      case 'business': return 'green';
    }
  };
  
  // Generate email subject
  const getEmailSubject = (): string => {
    return `My AI Journey - ${currentDate}`;
  };
  
  // Generate email body HTML
  const getEmailBodyHTML = (): string => {
    const categoryGrouped: Record<SectionName, UseCase[]> = {
      personal: [],
      teams: [],
      business: []
    };
    
    // Group use cases by category
    selectedUseCases.forEach(useCase => {
      categoryGrouped[useCase.category].push(useCase);
    });
    
    // Generate HTML for email
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${getEmailSubject()}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaeaea;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .date {
          color: #6b7280;
          font-size: 14px;
          margin-top: 5px;
        }
        .intro {
          margin-bottom: 25px;
          font-size: 16px;
        }
        .category {
          margin-bottom: 25px;
        }
        .category-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eaeaea;
        }
        .personal-title { color: #3b82f6; }
        .teams-title { color: #9333ea; }
        .business-title { color: #22c55e; }
        .use-case {
          margin-bottom: 15px;
          padding-left: 15px;
          border-left: 3px solid #eaeaea;
        }
        .personal-case { border-left-color: #3b82f6; }
        .teams-case { border-left-color: #9333ea; }
        .business-case { border-left-color: #22c55e; }
        .use-case-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .use-case-description {
          color: #4b5563;
          font-size: 14px;
          margin-bottom: 8px;
        }
        .user-note {
          font-style: italic;
          background-color: #f9fafb;
          padding: 10px;
          border-radius: 5px;
          margin-top: 5px;
          color: #4b5563;
          font-size: 14px;
        }
        .user-note:before {
          content: '"';
        }
        .user-note:after {
          content: '"';
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eaeaea;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        .stats {
          background-color: #f1f5f9;
          border-radius: 5px;
          padding: 8px 12px;
          font-size: 14px;
          color: #475569;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">My AI Journey</div>
        <div class="date">${currentDate}</div>
      </div>
      
      <div class="intro">
        I've been exploring the potential of collaborative AI and have selected these use cases that align with my interests and goals:
      </div>
    `;
    
    // Process each category
    (['personal', 'teams', 'business'] as SectionName[]).forEach((category) => {
      const useCases = categoryGrouped[category];
      if (useCases.length === 0) return;
      
      // Add category section
      htmlContent += `
      <div class="category">
        <div class="category-title ${category}-title">${category.charAt(0).toUpperCase() + category.slice(1)} AI</div>
      `;
      
      // Add each use case
      useCases.forEach(useCase => {
        const note = userNotes[useCase.id] || '';
        
        htmlContent += `
        <div class="use-case ${category}-case">
          <div class="use-case-title">${useCase.text}</div>
          <div class="use-case-description">${useCase.tooltip.description}</div>
          <div class="stats">${useCase.tooltip.stats}</div>
          ${note ? `<div class="user-note">${note}</div>` : ''}
        </div>
        `;
      });
      
      htmlContent += `</div>`;
    });
    
    // Add footer
    htmlContent += `
      <div class="footer">
        <p>Generated on ${currentDate} from the Collaborative AI Ecosystem Portal</p>
        <p>Learn more about how AI can empower your work at <a href="https://example.com/collaborative-ai">example.com/collaborative-ai</a></p>
      </div>
    </body>
    </html>
    `;
    
    return htmlContent;
  };
  
  // Generate plain text email for fallback
  const getEmailBodyText = (): string => {
    let textContent = `MY AI JOURNEY - ${currentDate}\n\n`;
    
    textContent += `I've been exploring the potential of collaborative AI and have selected these use cases that align with my interests and goals:\n\n`;
    
    // Group by category
    const categoryGrouped: Record<SectionName, UseCase[]> = {
      personal: [],
      teams: [],
      business: []
    };
    
    selectedUseCases.forEach(useCase => {
      categoryGrouped[useCase.category].push(useCase);
    });
    
    // Process each category
    (['personal', 'teams', 'business'] as SectionName[]).forEach((category) => {
      const useCases = categoryGrouped[category];
      if (useCases.length === 0) return;
      
      textContent += `${category.toUpperCase()} AI:\n`;
      textContent += `${'-'.repeat(category.length + 4)}\n\n`;
      
      // Add each use case
      useCases.forEach(useCase => {
        const note = userNotes[useCase.id] || '';
        
        textContent += `* ${useCase.text}\n`;
        textContent += `  ${useCase.tooltip.description}\n`;
        textContent += `  ${useCase.tooltip.stats}\n`;
        if (note) {
          textContent += `  Note: "${note}"\n`;
        }
        textContent += `\n`;
      });
    });
    
    textContent += `\nGenerated on ${currentDate} from the Collaborative AI Ecosystem Portal\n`;
    textContent += `Learn more about how AI can empower your work at example.com/collaborative-ai`;
    
    return textContent;
  };
  
  // Copy the HTML content to clipboard
  const copyToClipboard = () => {
    const content = getEmailBodyText();
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Open email client with pre-filled content
  const openEmailClient = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(getEmailBodyText());
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setEmailOpened(true);
  };
  
  // Render a preview of the email content
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Email Summary Generator</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow p-4">
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              This tool generates a formatted email summary of your selected AI moments. You can copy the text or open your email client with the content pre-filled.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="font-medium text-gray-700 dark:text-gray-300">Preview</div>
            </div>
            <div className="p-4 max-h-[40vh] overflow-y-auto bg-white dark:bg-gray-800">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">My AI Journey</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">{currentDate}</div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                I've been exploring the potential of collaborative AI and have selected these use cases that align with my interests and goals:
              </p>
              
              {(['personal', 'teams', 'business'] as SectionName[]).map(category => {
                const useCases = selectedUseCases.filter(uc => uc.category === category);
                if (useCases.length === 0) return null;
                
                const color = getCategoryColor(category);
                const colorClass = colorClasses[color];
                
                return (
                  <div key={category} className="mb-6">
                    <h3 className={`text-lg font-bold mb-3 ${colorClass.text} border-b pb-1`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)} AI
                    </h3>
                    
                    {useCases.map(useCase => {
                      const note = userNotes[useCase.id] || '';
                      
                      return (
                        <div key={useCase.id} className={`mb-4 pl-3 border-l-2 ${colorClass.border}`}>
                          <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">{useCase.text}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{useCase.tooltip.description}</div>
                          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400 mb-2">
                            {useCase.tooltip.stats}
                          </div>
                          {note && (
                            <div className="italic text-sm bg-gray-50 dark:bg-gray-700/50 p-2 rounded text-gray-600 dark:text-gray-400">
                              "{note}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p>Generated on {currentDate} from the Collaborative AI Ecosystem Portal</p>
                <p>Learn more about how AI can empower your work at example.com/collaborative-ai</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-end gap-3">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          
          <button
            onClick={openEmailClient}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {emailOpened ? 'Email Client Opened' : 'Open in Email Client'}
          </button>
          
          <a
            href={`data:text/html;charset=utf-8,${encodeURIComponent(getEmailBodyHTML())}`}
            download="my-ai-journey.html"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download HTML
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailSummaryGenerator;
