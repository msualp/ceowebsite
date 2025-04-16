'use client';

import { useReducer, useCallback } from 'react';
import { FormState, FormAction, FormData } from '../types';
import { useFormValidation } from './useFormValidation';
import { useFormPersistence } from './useFormPersistence';

// Initial form data
const initialFormData: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  aiExperience: '',
  aiInterest: '',
  userType: [],
  referralSource: '',
  otherReferral: ''
};

// Initial form state
const initialFormState: FormState = {
  formData: initialFormData,
  formError: '',
  currentStep: 1,
  isSubmitting: false
};

// Form reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        },
        formError: ''
      };
    case 'UPDATE_CHECKBOX':
      return {
        ...state,
        formData: {
          ...state.formData,
          userType: action.checked 
            ? [...state.formData.userType, action.field]
            : state.formData.userType.filter(type => type !== action.field)
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        formError: action.error
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
        formError: ''
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
        formError: ''
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    case 'RESET_FORM':
      return {
        ...initialFormState
      };
    default:
      return state;
  }
};

/**
 * Custom hook for managing form state
 * 
 * @param isVisible Whether the popup is visible
 * @returns Form state and handlers
 */
export const useFormState = (isVisible: boolean) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { formData, formError, currentStep, isSubmitting } = state;

  // Set error message
  const setError = useCallback((error: string) => {
    dispatch({ type: 'SET_ERROR', error });
  }, []);

  // Use form validation
  const { validateEmail, validateStep, getFieldValidationState } = useFormValidation(
    formData,
    currentStep,
    setError
  );

  // Use form persistence
  const { clearSavedFormData } = useFormPersistence(formData, dispatch, isVisible);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch({ type: 'UPDATE_CHECKBOX', field: name, checked });
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    if (validateStep()) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [validateStep]);

  // Go to previous step
  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateStep()) {
      return;
    }
    
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
    
    try {
      // In a real implementation, this would submit the form data
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      
      // Clear saved form data on successful submission
      clearSavedFormData();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  }, [formData, validateStep, clearSavedFormData, setError]);

  return {
    formData,
    formError,
    currentStep,
    isSubmitting,
    dispatch,
    validateEmail,
    validateStep,
    getFieldValidationState,
    handleInputChange,
    handleCheckboxChange,
    nextStep,
    prevStep,
    resetForm,
    handleSubmit
  };
};
