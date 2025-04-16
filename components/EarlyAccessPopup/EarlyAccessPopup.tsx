'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import { useFormState } from './hooks/useFormState';
import { TOTAL_STEPS } from './constants';
import { usePopup } from './context/PopupContext';

// Layout
import PopupWrapper from './layout/PopupWrapper';

// Steps
import WelcomeStep from './steps/WelcomeStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AIExperienceStep from './steps/AIExperienceStep';
import AIInterestStep from './steps/AIInterestStep';
import UserTypeStep from './steps/UserTypeStep';
import ReferralStep from './steps/ReferralStep';
import SuccessStep from './steps/SuccessStep';

// UI Components
import ProgressBar from './ui/ProgressBar';
import FormNavigation from './ui/FormNavigation';
import ConfettiExplosion from './ui/ConfettiExplosion';

// Constants
const ANIMATION_DURATION = 400;

/**
 * Styled container for consistent spacing
 */
const StepContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col space-y-6 py-6">
    {children}
  </div>
);

/**
 * Props for the FormContent component
 */
interface FormContentProps {
  handleClose: () => void;
}

/**
 * Form content component that uses the form context
 */
const FormContent = React.memo<FormContentProps>(({ handleClose }) => {
  const { 
    state: { formData, formError, currentStep, isSubmitting },
    handleInputChange,
    handleCheckboxChange,
    nextStep,
    prevStep,
    handleSubmit
  } = useFormContext();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Handle form submission
  const onSubmit = useCallback(async () => {
    try {
      await handleSubmit();
      setShowSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }, [handleSubmit]);

  // Handle start application
  const handleStartApplication = useCallback(() => {
    setShowWelcome(false);
  }, []);

  // Step components map for cleaner rendering
  const stepComponents = useMemo(() => [
    <PersonalInfoStep 
      key="personal-info"
      formData={formData} 
      formError={formError} 
      handleInputChange={handleInputChange} 
    />,
    <AIExperienceStep 
      key="ai-experience"
      formData={formData} 
      formError={formError} 
      handleInputChange={handleInputChange} 
    />,
    <AIInterestStep 
      key="ai-interest"
      formData={formData} 
      formError={formError} 
      handleInputChange={handleInputChange} 
    />,
    <UserTypeStep 
      key="user-type"
      formData={formData} 
      formError={formError} 
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
    />,
    <ReferralStep 
      key="referral"
      formData={formData} 
      formError={formError} 
      handleInputChange={handleInputChange} 
    />
  ], [formData, formError, handleInputChange, handleCheckboxChange]);

  if (showWelcome) {
    return (
      <WelcomeStep onStart={handleStartApplication} />
    );
  }

  if (showSuccess) {
    return (
      <div className="py-8">
        <ConfettiExplosion active={showSuccess} />
        <SuccessStep handleClose={handleClose} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Add top margin to progress bar */}
      <div className="mt-6 mb-8">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
        />
      </div>
      
      {/* Wrap step component with spacing container */}
      <StepContainer>
        {stepComponents[currentStep - 1]}
      </StepContainer>
      
      {/* Add bottom margin to navigation */}
      <div className="mt-6 mb-6">
        <FormNavigation 
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          isSubmitting={isSubmitting}
          handlePrev={prevStep}
          handleNext={nextStep}
          handleSubmit={onSubmit}
        />
      </div>
    </div>
  );
});

FormContent.displayName = 'FormContent';

/**
 * Main EarlyAccessPopup component
 */
const EarlyAccessPopup = () => {
  const { isVisible, hidePopup } = usePopup();
  const [isExiting, setIsExiting] = useState(false);

  // Handle close with proper animation
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      hidePopup();
      setIsExiting(false);
    }, ANIMATION_DURATION);
  }, [hidePopup]);

  // Create form state
  const formState = useFormState(isVisible);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state: {
      formData: formState.formData,
      formError: formState.formError,
      currentStep: formState.currentStep,
      isSubmitting: formState.isSubmitting
    },
    dispatch: formState.dispatch,
    validateEmail: formState.validateEmail,
    validateStep: formState.validateStep,
    handleInputChange: formState.handleInputChange,
    handleCheckboxChange: formState.handleCheckboxChange,
    nextStep: formState.nextStep,
    prevStep: formState.prevStep,
    handleSubmit: formState.handleSubmit
  }), [formState]);

  // Don't render anything if popup is not visible
  if (!isVisible && !isExiting) {
    return null;
  }

  return (
    <FormProvider value={contextValue}>
      <PopupWrapper 
        isVisible={isVisible} 
        isExiting={isExiting} 
        handleClose={handleClose}
        // Add additional padding to the popup wrapper
        className="p-6"
      >
        <FormContent handleClose={handleClose} />
      </PopupWrapper>
    </FormProvider>
  );
};

export default React.memo(EarlyAccessPopup);
