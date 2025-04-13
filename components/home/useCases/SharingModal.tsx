'use client';

import React, { useState } from 'react';
import EmailSummaryGenerator from './EmailSummaryGenerator';
import { UseCase } from './types';

interface SharingModalProps {
  showSharingModal: boolean;
  setShowSharingModal: (show: boolean) => void;
  shareUrl: string;
  copyShareUrl: () => void;
  selectedUseCases: UseCase[];
  userNotes: Record<string, string>;
}

const SharingModal: React.FC<SharingModalProps> = ({
  showSharingModal,
  setShowSharingModal,
  shareUrl,
  copyShareUrl,
  selectedUseCases,
  userNotes
}) => {
  const [showEmailGenerator, setShowEmailGenerator] = useState(false);
  
  if (!showSharingModal) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Share Your AI Journey</h3>
            <button 
              onClick={() => setShowSharingModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Share your personalized AI journey with friends and colleagues.
          </p>
          
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
            <input 
              type="text" 
              value={shareUrl}
              readOnly
              className="flex-grow bg-transparent p-3 outline-none text-gray-800 dark:text-gray-200 text-sm"
            />
            <button 
              onClick={copyShareUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
          
          {/* Email and Document Export Option */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Export as Document</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
              Create a formatted document of your AI journey that you can email, download, or print.
            </p>
            <button
              onClick={() => setShowEmailGenerator(true)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Generate Document
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
            <button className="flex-1 py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Twitter
            </button>
            <button className="flex-1 py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </button>
          </div>
        </div>
      </div>
      
      {/* Email Summary Generator Modal */}
      {showEmailGenerator && (
        <EmailSummaryGenerator
          selectedUseCases={selectedUseCases}
          userNotes={userNotes}
          onClose={() => setShowEmailGenerator(false)}
        />
      )}
    </>
  );
};

export default SharingModal;
