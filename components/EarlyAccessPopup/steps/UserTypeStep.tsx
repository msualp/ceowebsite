'use client';

import React from 'react';
import { StepProps } from '../types';
import { USER_TYPE_OPTIONS } from '../constants';

/**
 * Fourth step of the form - User Type
 */
const UserTypeStep: React.FC<StepProps> = ({ 
  formData, 
  formError, 
  handleInputChange,
  handleCheckboxChange 
}) => {
  if (!handleCheckboxChange) {
    console.error('handleCheckboxChange is required for UserTypeStep');
    return null;
  }

  return (
    <div id="step-4" className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Tell us a bit more about yourself</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-5">This helps us tailor your Early Access experience (optional).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {USER_TYPE_OPTIONS.map(option => (
          <label 
            key={option.value}
            className={`relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all ${
              formData.userType.includes(option.value) 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600/30'
            }`}
          >
            <input 
              type="checkbox" 
              name={option.value} 
              checked={formData.userType.includes(option.value)}
              onChange={handleCheckboxChange}
              className="absolute top-4 right-4 h-5 w-5 text-indigo-600 dark:text-indigo-400"
            />
            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-300">
              {renderIcon(option.icon)}
            </div>
            <span className="block font-medium text-gray-900 dark:text-white">{option.label}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">{option.description}</span>
          </label>
        ))}
      </div>

      {formError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}
    </div>
  );
};

// Helper function to render icons
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'building':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      );
    case 'dollar-sign':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      );
    case 'star':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      );
    default:
      return null;
  }
};

export default UserTypeStep;
