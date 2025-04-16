'use client';

import { useEffect } from 'react';
import { FormData } from '../types';
import { FORM_STORAGE_KEY } from '../constants';

/**
 * Custom hook to handle form data persistence in localStorage
 * 
 * @param formData The current form data
 * @param dispatch The dispatch function from the form reducer
 * @returns void
 */
export const useFormPersistence = (
  formData: FormData,
  dispatch: React.Dispatch<any>,
  isVisible: boolean
) => {
  // Load saved form data when popup becomes visible
  useEffect(() => {
    if (isVisible) {
      const savedState = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          // Only restore if we have valid data
          if (parsedState.email) {
            dispatch({ 
              type: 'UPDATE_FIELD', 
              field: 'email', 
              value: parsedState.email 
            });
            
            if (parsedState.firstName) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'firstName', 
                value: parsedState.firstName 
              });
            }
            
            if (parsedState.lastName) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'lastName', 
                value: parsedState.lastName 
              });
            }
            
            if (parsedState.company) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'company', 
                value: parsedState.company 
              });
            }
            
            if (parsedState.aiExperience) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'aiExperience', 
                value: parsedState.aiExperience 
              });
            }
            
            if (parsedState.aiInterest) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'aiInterest', 
                value: parsedState.aiInterest 
              });
            }
            
            if (parsedState.userType && Array.isArray(parsedState.userType)) {
              parsedState.userType.forEach((type: string) => {
                dispatch({ 
                  type: 'UPDATE_CHECKBOX', 
                  field: type, 
                  checked: true 
                });
              });
            }
            
            if (parsedState.referralSource) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'referralSource', 
                value: parsedState.referralSource 
              });
            }
            
            if (parsedState.otherReferral) {
              dispatch({ 
                type: 'UPDATE_FIELD', 
                field: 'otherReferral', 
                value: parsedState.otherReferral 
              });
            }
          }
        } catch (e) {
          console.error('Error parsing saved form data', e);
        }
      }
    }
  }, [isVisible, dispatch]);

  // Save form data when it changes
  useEffect(() => {
    // Only save if we have at least one field filled out
    if (formData.email || formData.firstName || formData.lastName) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // Function to clear saved form data
  const clearSavedFormData = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  return { clearSavedFormData };
};
