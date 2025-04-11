'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { useToast } from '@/components/ToastContext';
import { contactSchema } from '@/lib/validation/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    reason: 'General Inquiry',
    message: '',
    token: ''
  });
  
  const [errors, setErrors] = useState({
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
    try {
      contactSchema.parse(formData);
      setErrors({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      return true;
    } catch (err) {
      const fieldErrors = err.errors.reduce((acc: Record<string, string>, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
      const userAgent = navigator.userAgent || 'unknown';
      await new Promise<void>((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(siteKey, { action: 'submit' }).then(token => {
            resolve(token);
          });
        });
      }).then(token => {
        const payload = {
          ...formData,
          token,
          userAgent,
        };

        return fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }).then(response => {
        if (!response.ok) throw new Error('Failed to send message');

        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thanks! Your message was sent successfully.',
        });

        showToast('success', 'Your message has been sent successfully!');

        setFormData({
          name: '',
          email: '',
          subject: '',
          reason: 'General Inquiry',
          message: '',
          token: ''
        });
      });
    } catch (err) {
      showToast('error', 'There was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer title="Contact" metaDescription="Contact page for Sociail, Inc. Reach out for inquiries.">
      <div className="relative mb-8 max-w-4xl mx-auto">
        <img
          src="/images/Sociail-office.png"
          alt="Sociail Office"
          className="w-full rounded-xl shadow-md grayscale"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          🏖️ Welcome to Our Global Headquarters and the Sociail "Beach Office"!
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h1>
      <p className="text-lg mb-8">
        I&apos;m always open to connecting with fellow entrepreneurs, technologists, and anyone passionate 
        about building the future. Feel free to reach out using the form below or connect with me on social media.
      </p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          
          {formStatus.submitted && formStatus.success ? (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
              <p>{formStatus.message}</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-label="Your name"
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="Your email"
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-label="Subject of your message"
                  className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Contact</label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  aria-label="Reason for contact"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                >
                  <option>General Inquiry</option>
                  <option>Speaking / Media</option>
                  <option>Collaboration</option>
                  <option>Investment / Business</option>
                </select>
                {formData.reason !== 'General Inquiry' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Great! You selected <strong>{formData.reason}</strong>. Feel free to be specific below.
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-label="Your message"
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex gap-1">
                      Sending<span className="animate-pulse">.</span>
                      <span className="animate-pulse delay-150">.</span>
                      <span className="animate-pulse delay-300">.</span>
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Find Me Online</h2>
          <div className="space-y-4">
            {/* LinkedIn - First */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaLinkedin({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                <a href="https://www.linkedin.com/in/sualp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  linkedin.com/in/sualp
                </a>
              </div>
            </div>
            
            {/* GitHub - Second */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaGithub({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                <a href="https://github.com/msualp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  github.com/msualp
                </a>
              </div>
            </div>

            {/* X (Twitter) - Third */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaXTwitter({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">X (formerly Twitter)</p>
                <a href="https://x.com/msualp_sociail" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  @msualp_sociail
                </a>
              </div>
            </div>

            {/* Email - Fourth */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {MdEmail({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <a href="mailto:mustafa@sualp.com" className="text-blue-600 hover:underline">
                  mustafa@sualp.com
                </a>
              </div>
            </div>

            {/* Office - Same styling as "Find Me Online" */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Office</h2>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                  {MdLocationOn({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
                </div>
                <div>
                  <p>
                    Sociail, Inc.<br />
                    511 N Boardwalk, Bower Beach<br />
                    Rehoboth Beach, DE 19971, USA
                  </p>
                  <a
                    href="https://www.google.com/maps/place/511+N+Boardwalk,+Rehoboth+Beach,+DE+19971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-block mt-2"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
