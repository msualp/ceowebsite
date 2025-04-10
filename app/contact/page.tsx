'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    reason: 'General Inquiry',
    message: ''
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        reason: 'General Inquiry',
        message: ''
      });
    }
  };
  return (
    <PageContainer title="Contact">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                >
                  <option>General Inquiry</option>
                  <option>Speaking / Media</option>
                  <option>Collaboration</option>
                  <option>Investment / Business</option>
                </select>
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
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
                >
                  Send Message
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
