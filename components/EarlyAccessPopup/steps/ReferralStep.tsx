'use client';

import React from 'react';
import { StepProps } from '../types';
import { REFERRAL_SOURCE_OPTIONS } from '../constants';

/**
 * Fifth step of the form - Referral Source
 */
const ReferralStep: React.FC<StepProps> = ({ 
  formData, 
  formError, 
  handleInputChange 
}) => {
  return (
    <div id="step-5" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Almost done! Look over before shipping off to the cloud.</h3>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">Application Summary</h4>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-medium text-gray-900 dark:text-white">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
          </div>
          {formData.company && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Company</p>
              <p className="font-medium text-gray-900 dark:text-white">{formData.company}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500 dark:text-gray-400">AI Experience</p>
            <p className="font-medium text-gray-900 dark:text-white">{formatExperience(formData.aiExperience)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Primary Interest</p>
            <p className="font-medium text-gray-900 dark:text-white">{formatInterest(formData.aiInterest)}</p>
          </div>
          {formData.userType.length > 0 && (
            <div className="col-span-2">
              <p className="text-gray-500 dark:text-gray-400">User Type</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatUserTypes(formData.userType)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">How did you first hear about Sociail? *</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {REFERRAL_SOURCE_OPTIONS.map(source => (
            <label 
              key={source.value} 
              className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.referralSource === source.value 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600/30'
              }`}
            >
              <input 
                type="radio" 
                name="referralSource" 
                value={source.value}
                checked={formData.referralSource === source.value}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2"
                aria-describedby={formError ? "referral-error" : undefined}
              />
              <div className="flex items-center">
                <span className="mr-2">{source.icon}</span>
                <span className="text-sm dark:text-gray-300">{source.value}</span>
              </div>
            </label>
          ))}
        </div>
        
        {formData.referralSource === "Other" && (
          <div className="mt-4">
            <input 
              type="text" 
              name="otherReferral"
              value={formData.otherReferral}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                formError && formData.referralSource === "Other" && !formData.otherReferral 
                  ? 'border-red-300 ring-1 ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
              placeholder="Please specify"
              aria-describedby={formError ? "referral-error" : undefined}
            />
          </div>
        )}

        {formError && (
          <p id="referral-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {formError}
          </p>
        )}
      </div>
    </div>
  );
};

// Helper functions to format data for display
const formatExperience = (experience: string): string => {
  switch (experience) {
    case 'NO_EXPERIENCE':
      return 'No Experience';
    case 'SOME_EXPERIENCE':
      return 'Some Experience';
    case 'EXPERIENCED':
      return 'Experienced';
    default:
      return experience;
  }
};

const formatInterest = (interest: string): string => {
  switch (interest) {
    case 'PERSONAL':
      return 'Personal Use';
    case 'PROFESSIONAL':
      return 'Professional Use';
    case 'ACADEMIC':
      return 'Academic Use';
    default:
      return interest;
  }
};

const formatUserTypes = (userTypes: string[]): string => {
  return userTypes.map(type => {
    switch (type) {
      case 'startup-leader':
        return 'Startup Leader';
      case 'investor':
        return 'Accredited Investor';
      case 'vip':
        return 'VIP User';
      default:
        return type;
    }
  }).join(', ');
};

export default ReferralStep;
