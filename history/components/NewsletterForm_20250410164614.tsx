'use client';

import { useState } from 'react';
import { useToast } from './ToastContext'; // Adjust path as necessary

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const { showToast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Email is required');
      showToast('warning', 'Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      showToast('error', 'Invalid email format');
      return;
    }

    setSubscriptionStatus({
      submitted: true,
      success: true,
      message: ''
    });

    setEmail('');
    setEmailError('');
    showToast('success', 'Thank you for subscribing!');
  };

  return (
    <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={handleSubscribe}>
      <div className="flex-grow">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
          className={`w-full px-4 py-2 rounded border ${emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} dark:bg-gray-800`}
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Subscribe
      </button>
    </form>
  );
}
