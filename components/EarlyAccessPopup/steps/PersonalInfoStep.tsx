'use client';

import React from 'react';
import { StepProps } from '../types';

/**
 * First step of the form - Personal Information
 */
const PersonalInfoStep: React.FC<StepProps> = ({ 
  formData, 
  formError, 
  handleInputChange 
}) => {
  return (
    <div id="step-1" className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Tell us about yourself</h3>
      
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email address <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border ${formError && !formData.email ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white`}
          placeholder="you@example.com"
          required
          aria-required="true"
          aria-invalid={formError && !formData.email ? "true" : "false"}
          aria-describedby={formError && !formData.email ? "email-error" : undefined}
          autoFocus
        />
        {formError && !formData.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            Email is required
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First name <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border ${formError && !formData.firstName ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white`}
            placeholder="Your first name"
            required
            aria-required="true"
            aria-invalid={formError && !formData.firstName ? "true" : "false"}
          />
          {formError && !formData.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              First name is required
            </p>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last name <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border ${formError && !formData.lastName ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white`}
            placeholder="Your last name"
            required
            aria-required="true"
            aria-invalid={formError && !formData.lastName ? "true" : "false"}
          />
          {formError && !formData.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Last name is required
            </p>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company <span className="text-gray-400 dark:text-gray-500">(optional)</span>
        </label>
        <input 
          type="text" 
          id="company" 
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white"
          placeholder="Your company"
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
