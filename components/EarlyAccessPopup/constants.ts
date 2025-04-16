/**
 * Constants for the EarlyAccessPopup component
 */

// Total number of steps in the form
export const TOTAL_STEPS = 5;

// Popup display delay in milliseconds
export const POPUP_DISPLAY_DELAY = 3000;

// Animation duration in milliseconds
export const ANIMATION_DURATION = 400;

// Local storage key for form data
export const FORM_STORAGE_KEY = 'earlyAccessFormData';

// AI Experience options
export const AI_EXPERIENCE_OPTIONS = [
  {
    value: 'NO_EXPERIENCE',
    label: 'No Experience',
    description: 'Never worked with AI before'
  },
  {
    value: 'SOME_EXPERIENCE',
    label: 'Some Experience',
    description: 'Worked with AI in a limited capacity or as a hobby'
  },
  {
    value: 'EXPERIENCED',
    label: 'Experienced',
    description: 'Worked with AI for personal, professional purposes or in a research setting'
  }
];

// AI Interest options
export const AI_INTEREST_OPTIONS = [
  {
    value: 'PERSONAL',
    label: 'Personal',
    description: 'For individual use',
    icon: 'user'
  },
  {
    value: 'PROFESSIONAL',
    label: 'Professional',
    description: 'For work or business',
    icon: 'briefcase'
  },
  {
    value: 'ACADEMIC',
    label: 'Academic',
    description: 'For research or education',
    icon: 'graduation-cap'
  }
];

// User type options
export const USER_TYPE_OPTIONS = [
  {
    value: 'startup-leader',
    label: 'Startup Leader',
    description: 'C-Suite Executive',
    icon: 'building'
  },
  {
    value: 'investor',
    label: 'Accredited Investor',
    description: 'Angel or VC',
    icon: 'dollar-sign'
  },
  {
    value: 'vip',
    label: 'VIP User',
    description: 'Invited by Sociail Team',
    icon: 'star'
  }
];

// Referral source options
export const REFERRAL_SOURCE_OPTIONS = [
  { value: 'AI suggestion', icon: '🤖' },
  { value: 'Blog or news article', icon: '📰' },
  { value: 'Podcast or video', icon: '🎙️' },
  { value: 'Event or conference', icon: '🎪' },
  { value: 'Online forum or community', icon: '👥' },
  { value: 'Social media', icon: '📱' },
  { value: 'Online search', icon: '🔍' },
  { value: 'Online advertisement', icon: '📢' },
  { value: 'Email or newsletter', icon: '📧' },
  { value: 'Personal recommendation', icon: '👋' },
  { value: 'Other', icon: '✨' }
];

// Validation error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Please fill in all required fields',
  INVALID_EMAIL: 'Please enter a valid email address',
  AI_EXPERIENCE_REQUIRED: 'Please select your AI experience level',
  AI_INTEREST_REQUIRED: 'Please select your primary interest in AI tools',
  REFERRAL_SOURCE_REQUIRED: 'Please tell us how you heard about Sociail',
  OTHER_REFERRAL_REQUIRED: 'Please specify how you heard about us',
  SUBMISSION_FAILED: 'Failed to submit form. Please try again.'
};

// Confetti colors
export const CONFETTI_COLORS = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#9370DB'];
