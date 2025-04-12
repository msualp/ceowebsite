'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import Link from 'next/link';
import { FaGithub, FaCode, FaLaptopCode, FaCopy, FaRocket } from 'react-icons/fa';
import { HiArrowLongRight, HiCheckCircle, HiOutlineClipboardDocumentList } from 'react-icons/hi2';

export default function TakeItPage() {
  const [copied, setCopied] = useState(false);
  
  const handleCloneCommand = () => {
    navigator.clipboard.writeText('git clone https://github.com/msualp/ceowebsite.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <PageContainer title="Take It">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-6 rounded-xl overflow-hidden mb-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Moving Circle Animation */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <FaCode className="mr-2" /> Open-Source Project
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Take This Website
            <span className="block text-yellow-300">Make It Yours</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            This entire website is open-source and freely available for you to use, modify, and build upon. 
            I believe in sharing knowledge and tools to help fellow entrepreneurs and developers succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/mustafasualp/personal-site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-medium hover:bg-blue-50 transition flex items-center justify-center"
            >
              <FaGithub className="mr-2" />
              View on GitHub
            </a>
            <button 
              onClick={handleCloneCommand}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md font-medium hover:bg-blue-700 transition flex items-center justify-center relative overflow-hidden"
            >
              {copied ? (
                <>
                  <HiCheckCircle className="mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <HiOutlineClipboardDocumentList className="mr-2" />
                  Copy Clone Command
                </>
              )}
            </button>
          </div>
        </div>
      </section>
      
      {/* What's Included Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What's Included?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaLaptopCode className="text-blue-600 w-8 h-8" />,
              title: "Complete Website Code",
              description: "The entire codebase for this personal site, built with Next.js, React, and Tailwind CSS."
            },
            {
              icon: <FaRocket className="text-purple-600 w-8 h-8" />,
              title: "Page Templates",
              description: "Ready-to-use templates for About, Journey, Insights, and more - just add your content."
            },
            {
              icon: <FaCopy className="text-green-600 w-8 h-8" />,
              title: "Reusable Components",
              description: "A library of components for building additional pages and features."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Steps to Get Started */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Get Started in Minutes</h2>
        <div className="space-y-6">
          {[
            {
              number: "01",
              title: "Clone the Repository",
              description: "Use Git to clone the repository to your local machine.",
              code: "git clone https://github.com/msualp/ceowebsite.git"
            },
            {
              number: "02",
              title: "Install Dependencies",
              description: "Navigate to the project directory and install the required packages.",
              code: "cd personal-site && npm install"
            },
            {
              number: "03",
              title: "Customize Content",
              description: "Replace the placeholder content with your own information.",
              code: "# Edit files in src/app/* to customize content"
            },
            {
              number: "04",
              title: "Deploy Your Site",
              description: "Deploy to Vercel, Netlify, or your preferred hosting platform.",
              code: "npm run build"
            }
          ].map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                {step.number}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                <div 
                  className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm overflow-x-auto"
                >
                  {step.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* License Information */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">Licensing</h2>
        <div className="space-y-4">
          <p>
            This website's code is available under the <strong>MIT License</strong>, which means you can:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use it for personal and commercial projects</li>
            <li>Modify it to suit your needs</li>
            <li>Distribute your own versions</li>
            <li>Include it in your own open or closed source projects</li>
          </ul>
          <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700 mt-6">
            <h3 className="font-bold mb-2">Important Note:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              While the <strong>code</strong> is MIT licensed, the <strong>content</strong> (text, images, personal information) is copyrighted. 
              Please replace all content with your own when using this template.
            </p>
          </div>
        </div>
      </section>
      
      {/* Community & Support */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Community & Support</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
            <p className="mb-4">If you need help or have questions about using this template, feel free to:</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Open an issue on GitHub
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Check the documentation in the README
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Reach out to me on LinkedIn
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Contribute Back</h3>
            <p className="mb-4">Found a bug? Made an improvement? I welcome contributions:</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Submit a pull request
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Share your customizations
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                Star the repository if you find it useful
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Make It Your Own?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Take this template, customize it, and launch your personal site today. I can't wait to see what you build!
        </p>
        <a 
          href="https://github.com/mustafasualp/personal-site" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-medium hover:bg-blue-50 transition"
        >
          Get Started Now
          <HiArrowLongRight className="ml-2" />
        </a>
      </section>
    </PageContainer>
  );
}  // End of TakeItPage component