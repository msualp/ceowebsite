'use client';

import React, { useState } from 'react';

interface NewsletterProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Newsletter component for the Collaborative AI page
 */
export default function Newsletter({ className = '' }: NewsletterProps) {
  // State for email subscription
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Validate email function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
  
  // Handle form submission
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
      message: 'Thank you for subscribing! You\'ll be the first to receive our Collaborative AI insights.'
    });
    
    // Reset form
    setEmail('');
  };

  return (
    <section id="newsletter" className={`py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-16 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Subscribe to our newsletter for the latest insights, research findings, and events in Collaborative AI
        </p>
        
        {subscriptionStatus.submitted && subscriptionStatus.success ? (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
            <p>{subscriptionStatus.message}</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubscribe}>
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 rounded-md border ${emailError ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                aria-label="Email address"
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1" id="email-error">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none"
            >
              Subscribe
            </button>
          </form>
        )}
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          We respect your privacy and will never share your information. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
