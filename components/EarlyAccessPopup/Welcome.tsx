import React, { useState, useEffect } from 'react';
import { X, Rocket, ArrowRight, ArrowLeft, Gift, Check, Ticket } from 'lucide-react';

const SociailEarlyAccessPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    aiExperience: '',
    aiInterest: '',
    userType: [],
    referralSource: '',
    otherReferral: ''
  });

  const totalSteps = 5;

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  const handleSubmit = () => {
    // In a real implementation, this would submit the form data
    console.log('Form submitted:', formData);
    setShowConfetti(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          userType: [...prev.userType, name]
        };
      } else {
        return {
          ...prev,
          userType: prev.userType.filter(type => type !== name)
        };
      }
    });
  };

  const validateStep = () => {
    switch(currentStep) {
      case 1:
        if (!formData.email || !formData.firstName || !formData.lastName) {
          setFormError('Please fill in all required fields');
          return false;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
          setFormError('Please enter a valid email address');
          return false;
        }
        break;
      case 2:
        if (!formData.aiExperience) {
          setFormError('Please select your AI experience level');
          return false;
        }
        break;
      case 3:
        if (!formData.aiInterest) {
          setFormError('Please select your primary interest in AI tools');
          return false;
        }
        break;
      case 4:
        // This step is optional, so no validation needed
        break;
      case 5:
        if (!formData.referralSource) {
          setFormError('Please tell us how you heard about Sociail');
          return false;
        }
        if (formData.referralSource === 'Other' && !formData.otherReferral) {
          setFormError('Please specify how you heard about us');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setFormError('');
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormError('');
    }
  };

  const startApplication = () => {
    setActiveTab('apply');
    setCurrentStep(1);
    setFormError('');
  };

  if (!isVisible) return null;

  const renderProgressBar = () => {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    
    return (
      <div className="w-full mb-8 px-6">
        <div className="flex justify-between mb-2 text-xs text-gray-500">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  const renderConfetti = () => {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const color = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#9370DB'][Math.floor(Math.random() * 5)];
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const delay = Math.random() * 0.5;
          
          return (
            <div
              key={i}
              className="absolute animate-confetti opacity-70"
              style={{
                width: size + 'px',
                height: size + 'px',
                backgroundColor: color,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                top: '-20px',
                left: left + '%',
                animation: `confetti ${animationDuration}s ease-in ${delay}s forwards`
              }}
            />
          );
        })}
        <style jsx>{`
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  const renderFormStep = () => {
    if (showConfetti) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-8">
          {renderConfetti()}
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
            <Ticket size={30} className="text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You're In!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Thanks for applying to Sociail's Early Access Program! 
          </p>
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-6 max-w-md">
            <h3 className="font-medium text-indigo-900 mb-2">Look for the Golden Ticket!</h3>
            <p className="text-indigo-700">
              Keep an eye on your inbox for our welcome email. If you're selected for our 
              exclusive first wave, you'll find your access code (aka "Golden Ticket") 
              and T-shirt redemption instructions!
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Awesome, Got It!
          </button>
        </div>
      );
    }
    
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your first name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your last name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
              <input 
                type="text" 
                id="company" 
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your company"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">How do you rate yourself on using AI and AI-powered tools? *</h3>
            
            <div className="space-y-3">
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiExperience" 
                  value="NO EXPERIENCE"
                  checked={formData.aiExperience === "NO EXPERIENCE"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">NO EXPERIENCE</span>
                  <span className="text-gray-500 text-sm">Never worked with AI before</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiExperience" 
                  value="SOME EXPERIENCE"
                  checked={formData.aiExperience === "SOME EXPERIENCE"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">SOME EXPERIENCE</span>
                  <span className="text-gray-500 text-sm">Worked with AI in a limited capacity or as a hobby</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiExperience" 
                  value="EXPERIENCED"
                  checked={formData.aiExperience === "EXPERIENCED"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">EXPERIENCED</span>
                  <span className="text-gray-500 text-sm">Worked with AI for personal, professional purposes or in a research setting</span>
                </div>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">What is your primary interest in using AI and AI-powered tools? *</h3>
            
            <div className="space-y-3">
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiInterest" 
                  value="PERSONAL"
                  checked={formData.aiInterest === "PERSONAL"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">For PERSONAL use</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiInterest" 
                  value="PROFESSIONAL"
                  checked={formData.aiInterest === "PROFESSIONAL"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">For PROFESSIONAL use</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="aiInterest" 
                  value="ACADEMIC"
                  checked={formData.aiInterest === "ACADEMIC"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">For ACADEMIC use</span>
                </div>
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Does any of the following describe you? (Optional)</h3>
            
            <div className="space-y-3">
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  name="startup-leader" 
                  checked={formData.userType.includes("startup-leader")}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">Startup Leader (C-Suite)</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  name="investor" 
                  checked={formData.userType.includes("investor")}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">Accredited investor</span>
                </div>
              </label>
              
              <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  name="vip" 
                  checked={formData.userType.includes("vip")}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 mt-1"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">A VIP User invited by the Sociail Team</span>
                </div>
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Almost done! Look over before shipping off to the cloud.</h3>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <h4 className="font-medium text-gray-900">Application Summary</h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{formData.email}</p>
                </div>
                {formData.company && (
                  <div>
                    <p className="text-gray-500">Company</p>
                    <p className="font-medium text-gray-900">{formData.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500">AI Experience</p>
                  <p className="font-medium text-gray-900">{formData.aiExperience}</p>
                </div>
                <div>
                  <p className="text-gray-500">Primary Interest</p>
                  <p className="font-medium text-gray-900">{formData.aiInterest} USE</p>
                </div>
                {formData.userType.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-gray-500">User Type</p>
                    <p className="font-medium text-gray-900">
                      {formData.userType.map(type => {
                        if (type === 'startup-leader') return 'Startup Leader';
                        if (type === 'investor') return 'Accredited Investor';
                        if (type === 'vip') return 'VIP User';
                        return type;
                      }).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">How did you first hear about Sociail? *</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'AI suggestion',
                  'Blog or news article',
                  'Podcast or video',
                  'Event or conference',
                  'Online forum or community',
                  'Social media',
                  'Online search',
                  'Online advertisement',
                  'Email or newsletter',
                  'Personal recommendation'
                ].map(source => (
                  <label key={source} className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="referralSource" 
                      value={source}
                      checked={formData.referralSource === source}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 mt-1"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900">{source}</span>
                    </div>
                  </label>
                ))}
                
                <label className="flex p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 sm:col-span-2">
                  <input 
                    type="radio" 
                    name="referralSource" 
                    value="Other"
                    checked={formData.referralSource === "Other"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 mt-1"
                  />
                  <div className="ml-3 flex-grow">
                    <span className="block text-gray-900">Other:</span>
                    {formData.referralSource === "Other" && (
                      <input 
                        type="text" 
                        name="otherReferral"
                        value={formData.otherReferral}
                        onChange={handleInputChange}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Please specify"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full mx-4 transition-all duration-400 ease-out ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: '90vh'
        }}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white bg-opacity-80 rounded-full p-1.5"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Header with tabs */}
        {!showConfetti && (
          <div className="bg-indigo-600 text-white">
            <div className="flex text-center">
              <button 
                className={`flex-1 py-4 px-6 font-medium text-lg transition-colors ${
                  activeTab === 'benefits' 
                  ? 'bg-indigo-700 text-white' 
                  : 'bg-transparent text-indigo-100 hover:bg-indigo-700/50'
                }`}
                onClick={() => setActiveTab('benefits')}
                disabled={showConfetti}
              >
                Program Benefits
              </button>
              <button 
                className={`flex-1 py-4 px-6 font-medium text-lg transition-colors ${
                  activeTab === 'apply' 
                  ? 'bg-indigo-700 text-white' 
                  : 'bg-transparent text-indigo-100 hover:bg-indigo-700/50'
                }`}
                onClick={() => setActiveTab('apply')}
                disabled={showConfetti}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className={`${activeTab === 'apply' ? 'h-[80vh] max-h-[700px]' : ''} overflow-y-auto`}>
          {activeTab === 'benefits' && (
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Rocket size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Join Sociail's Early Access</h2>
              </div>
              
              <p className="text-gray-600 text-lg">
                Be among the first to experience our revolutionary AI-powered collaboration platform. 
                Program launches in June 2025!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs mr-3 mt-0.5">✓</div>
                  <span className="text-gray-700">Multi-agent AI collaboration</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs mr-3 mt-0.5">✓</div>
                  <span className="text-gray-700">Priority support</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs mr-3 mt-0.5">✓</div>
                  <span className="text-gray-700">Early access to features</span>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs mr-3 mt-0.5">✓</div>
                  <span className="text-gray-700">Special early adopter pricing</span>
                </div>
              </div>
              
              {/* T-shirt highlight */}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Gift size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Free Limited Edition T-Shirt</h3>
                  <p className="text-indigo-700 text-sm">Selected participants will receive an exclusive Sociail t-shirt!</p>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={startApplication}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-lg"
                >
                  Apply for Early Access
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Limited spots available. Don't miss your chance!
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'apply' && !showConfetti && (
            <div className="py-6 flex flex-col h-full">
              {/* Back to benefits button */}
              <div className="px-8 mb-4">
                <button 
                  onClick={() => setActiveTab('benefits')}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <ArrowLeft size={14} className="mr-1" />
                  Back to benefits
                </button>
              </div>
              
              {renderProgressBar()}
              
              <div className="px-8 pb-8 flex-grow">
                {renderFormStep()}
                
                {formError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                    {formError}
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button 
                      onClick={prevStep}
                      className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div to maintain flex layout
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button 
                      onClick={nextStep}
                      className="flex items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Next
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      className="flex items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Submit Application
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  )}
                </div>
                
                {currentStep === totalSteps && (
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By applying, you agree to our Terms of Service and Privacy Policy.
                  </p>
                )}
              </div>
              
              {/* T-shirt reminder footer - appears on all form pages */}
              <div className="border-t border-gray-200 mt-auto pt-4 px-8 pb-4 flex items-center justify-center bg-gray-50">
                <Gift size={18} className="text-indigo-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-indigo-600">Don't forget:</span> Selected participants receive a free limited edition Sociail T-shirt!
                </p>
              </div>
            </div>
          )}
          
          {showConfetti && (
            <div>
              {renderFormStep()}
              <div className="px-8 pb-8 text-center">
                <button 
                  onClick={() => {
                    setShowConfetti(false);
                    setActiveTab('benefits');
                  }}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Return to homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SociailEarlyAccessPopup;