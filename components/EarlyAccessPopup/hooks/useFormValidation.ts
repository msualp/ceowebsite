'use client';

import { useCallback } from 'react';
import { FormData } from '../types';
import { ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for form validation
 * 
 * @param formData The current form data
 * @param currentStep The current step in the form
 * @param setError Function to set error message
 * @returns Object with validation functions
 */
export const useFormValidation = (
  formData: FormData,
  currentStep: number,
  setError: (error: string) => void
) => {
  // Validate email with regex
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Validate current step
  const validateStep = useCallback((): boolean => {
    switch(currentStep) {
      case 1:
        if (!formData.email || !formData.firstName || !formData.lastName) {
          setError(ERROR_MESSAGES.REQUIRED_FIELDS);
          return false;
        }
        if (!validateEmail(formData.email)) {
          setError(ERROR_MESSAGES.INVALID_EMAIL);
          return false;
        }
        break;
      case 2:
        if (!formData.aiExperience) {
          setError(ERROR_MESSAGES.AI_EXPERIENCE_REQUIRED);
          return false;
        }
        break;
      case 3:
        if (!formData.aiInterest) {
          setError(ERROR_MESSAGES.AI_INTEREST_REQUIRED);
          return false;
        }
        break;
      case 4:
        // This step is optional, so no validation needed
        break;
      case 5:
        if (!formData.referralSource) {
          setError(ERROR_MESSAGES.REFERRAL_SOURCE_REQUIRED);
          return false;
        }
        if (formData.referralSource === 'Other' && !formData.otherReferral) {
          setError(ERROR_MESSAGES.OTHER_REFERRAL_REQUIRED);
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }, [currentStep, formData, setError, validateEmail]);

  // Get field validation state
  const getFieldValidationState = useCallback((fieldName: keyof FormData): { 
    isValid: boolean; 
    errorMessage: string | null;
  } => {
    switch(fieldName) {
      case 'email':
        if (!formData.email) {
          return { isValid: false, errorMessage: 'Email is required' };
        }
        if (!validateEmail(formData.email)) {
          return { isValid: false, errorMessage: ERROR_MESSAGES.INVALID_EMAIL };
        }
        return { isValid: true, errorMessage: null };
      
      case 'firstName':
        if (!formData.firstName) {
          return { isValid: false, errorMessage: 'First name is required' };
        }
        return { isValid: true, errorMessage: null };
      
      case 'lastName':
        if (!formData.lastName) {
          return { isValid: false, errorMessage: 'Last name is required' };
        }
        return { isValid: true, errorMessage: null };
      
      case 'aiExperience':
        if (currentStep >= 2 && !formData.aiExperience) {
          return { isValid: false, errorMessage: ERROR_MESSAGES.AI_EXPERIENCE_REQUIRED };
        }
        return { isValid: true, errorMessage: null };
      
      case 'aiInterest':
        if (currentStep >= 3 && !formData.aiInterest) {
          return { isValid: false, errorMessage: ERROR_MESSAGES.AI_INTEREST_REQUIRED };
        }
        return { isValid: true, errorMessage: null };
      
      case 'referralSource':
        if (currentStep >= 5 && !formData.referralSource) {
          return { isValid: false, errorMessage: ERROR_MESSAGES.REFERRAL_SOURCE_REQUIRED };
        }
        return { isValid: true, errorMessage: null };
      
      case 'otherReferral':
        if (currentStep >= 5 && formData.referralSource === 'Other' && !formData.otherReferral) {
          return { isValid: false, errorMessage: ERROR_MESSAGES.OTHER_REFERRAL_REQUIRED };
        }
        return { isValid: true, errorMessage: null };
      
      default:
        return { isValid: true, errorMessage: null };
    }
  }, [currentStep, formData, validateEmail]);

  return {
    validateEmail,
    validateStep,
    getFieldValidationState
  };
};
