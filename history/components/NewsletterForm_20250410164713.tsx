'use client';

import { useState } from 'react';
import { useToast } from './ToastContext'; // Adjust path as necessary

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
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
  
  const handleSubscribe = async (e: React.FormEvent) => {
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

    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setSubscriptionStatus({
        submitted: true,
        success: true,
        message: ''
      });

      setEmail('');
      setEmailError('');
      showToast('success', 'Thank you for subscribing!');
    } catch (error) {
      console.error('Subscription error:', error);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className={`px-6 py-2 text-white rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
