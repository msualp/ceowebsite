'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
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
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Simulate subscription success
    setSubscriptionStatus({
      submitted: true,
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
    
    // Reset form
    setEmail('');
  };

  return (
    <>
      {subscriptionStatus.submitted && subscriptionStatus.success ? (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
          <p>{subscriptionStatus.message}</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
