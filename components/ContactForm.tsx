'use client';

// Add global type declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
  const grecaptcha: Window['grecaptcha'];
}

import { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import Button from '@/components/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  reason: string;
  message: string;
  token: string;
}

interface FormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    reason: 'General Inquiry',
    message: '',
    token: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  
  const { showToast } = useToast();
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
      const token = await grecaptcha.execute(siteKey, { action: 'submit' });

      const payload = {
        ...formData,
        token,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send message');

      showToast('success', 'Your message has been sent successfully!');

      setFormData({
        name: '',
        email: '',
        subject: '',
        reason: 'General Inquiry',
        message: '',
        token: ''
      });
    } catch (err) {
      showToast('error', 'There was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fade-in-scroll">
      <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
      
      {formStatus.submitted && formStatus.success ? (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
          <p>{formStatus.message}</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <fieldset>
            <legend className="sr-only">Contact Information</legend>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 hover-lift-sm focus:outline-none`}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 hover-lift-sm focus:outline-none`}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 hover-lift-sm focus:outline-none`}
              />
              {errors.subject && (
                <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Contact</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 hover-lift-sm focus:outline-none"
              >
                <option>General Inquiry</option>
                <option>Speaking / Media</option>
                <option>Collaboration</option>
                <option>Investment / Business</option>
              </select>
              {formData.reason !== 'General Inquiry' && (
                <p className="text-sm text-gray-500 mt-1" id="reason-help">
                  Great! You selected <strong>{formData.reason}</strong>. Feel free to be specific below.
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 hover-lift-sm focus:outline-none`}
              ></textarea>
              {errors.message && (
                <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>
              )}
            </div>
          </fieldset>
          
          <div className="text-center">
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full md:w-auto"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
