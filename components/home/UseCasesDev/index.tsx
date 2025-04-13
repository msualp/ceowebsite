'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UseCase, SectionName, AnimationState, MAX_SELECTIONS, AUDIO, getCategoryColor, colorClasses } from './types';
import { allUseCases, categoryIcons, getUseCasesByCategory } from './data';
import type { ReactNode } from 'react';
import { storage } from './utils/storage';
import SelectionPanel from './SelectionPanel';
import SharingModal from './SharingModal';
import OnboardingTooltip from './OnboardingTooltip';
import CompletionCTA from './CompletionCTA';
import SectionHeader from './SectionHeader';
import AnimationStyles from './AnimationStyles';
import SingleCategoryRow from './SingleCategoryRow';

const UseCasesDevSection: React.FC = () => {
  // State for selected use cases
  const [selectedUseCases, setSelectedUseCases] = useState<UseCase[]>([]);
  
  // State for animation state
  const [animationState, setAnimationState] = useState<{
    [key in SectionName]: AnimationState
  }>({
    personal: 'running',
    teams: 'running',
    business: 'running'
  });

  // State to track if any pill is being hovered
  const [hoveredPill, setHoveredPill] = useState<{
    [key in SectionName]: boolean
  }>({
    personal: false,
    teams: false,
    business: false
  });

  // State to track touch events
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // State for mobile view management
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Selection completion state
  const [selectionComplete, setSelectionComplete] = useState<boolean>(false);
  
  // State for button click to reveal content
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  // Animation state for the selection panel
  const [selectionPanelVisible, setSelectionPanelVisible] = useState<boolean>(false);
  
  // State for UI progressive reveal
  const [uiReady, setUiReady] = useState<boolean>(false);
  const [sectionVisibility, setSectionVisibility] = useState<{
    [key in SectionName]: boolean
  }>({
    personal: false,
    teams: false,
    business: false
  });
  
  // State for tooltip display
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // State for first-time user onboarding
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [firstTimeUser, setFirstTimeUser] = useState<boolean>(true);
  
  // State for sound effects - synced with global sound preference
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  // Load sound preference from localStorage and listen for changes
  useEffect(() => {
    // Initial load from localStorage
    const savedPreference = localStorage.getItem('sound-enabled');
    if (savedPreference !== null) {
      setSoundEnabled(savedPreference === 'true');
    }
    
    // Listen for sound preference changes
    const handleSoundPreferenceChange = (event: CustomEvent) => {
      setSoundEnabled(event.detail.enabled);
    };
    
    window.addEventListener('sound-preference-changed', handleSoundPreferenceChange as EventListener);
    
    return () => {
      window.removeEventListener('sound-preference-changed', handleSoundPreferenceChange as EventListener);
    };
  }, []);
  
  // State for recommended items
  const [recommendedItems, setRecommendedItems] = useState<string[]>([]);
  
  // State for user notes
  const [userNotes, setUserNotes] = useState<{[key: string]: string}>({});
  
  // State for social sharing modal
  const [showSharingModal, setShowSharingModal] = useState<boolean>(false);
  
  // State for theme personalization
  const [themeColor, setThemeColor] = useState<'blue' | 'purple' | 'green'>('blue');
  
  // State for last updated timestamp
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Refs for scroll containers
  const onboardingRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Helper function to generate unique share URL
  const generateShareUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin + window.location.pathname;
    const selectionParam = selectedUseCases.map(uc => uc.id).join(',');
    return `${baseUrl}?selections=${selectionParam}`;
  }, [selectedUseCases]);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Progressive reveal animation on initial load
  useEffect(() => {
    // Initial load animation sequence with staggered timing
    setTimeout(() => setUiReady(true), 300);
    setTimeout(() => setSectionVisibility(prev => ({...prev, personal: true})), 600);
    setTimeout(() => setSectionVisibility(prev => ({...prev, teams: true})), 900);
    setTimeout(() => setSectionVisibility(prev => ({...prev, business: true})), 1200);
    
    // Check if this is a first-time user
    const hasVisitedBefore = storage.getItem('hasVisitedAiMomentsBefore');
    if (!hasVisitedBefore) {
      // Show onboarding tooltip after sections have appeared
      setTimeout(() => setShowOnboarding(true), 1500);
      storage.setItem('hasVisitedAiMomentsBefore', 'true');
    } else {
      setFirstTimeUser(false);
    }
    
    // Check for URL params (shared selections)
    const urlParams = new URLSearchParams(window.location.search);
    const sharedSelections = urlParams.get('selections');
    if (sharedSelections) {
      const selectedIds = sharedSelections.split(',');
      const selectedUseCasesFromUrl = allUseCases.filter(uc => selectedIds.includes(uc.id));
      if (selectedUseCasesFromUrl.length > 0) {
        setSelectedUseCases(selectedUseCasesFromUrl);
        setSelectionPanelVisible(true);
        if (selectedUseCasesFromUrl.length >= MAX_SELECTIONS) {
          setSelectionComplete(true);
        }
      }
    }
  }, []);

  // Load selected use cases from storage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Check if there are URL parameters for shared selections first
        const urlParams = new URLSearchParams(window.location.search);
        const sharedSelections = urlParams.get('selections');
        
        // If no shared selections in URL, try storage
        if (!sharedSelections) {
          const savedSelections = storage.getItem('aiMomentSelections');
          if (savedSelections) {
            const parsed = JSON.parse(savedSelections);
            
            // Extract selected use cases
            const useCases = parsed.useCases || [];
            setSelectedUseCases(useCases);
            
            // Extract user notes if available
            const notes = parsed.notes || {};
            setUserNotes(notes);
            
            // Extract last updated timestamp if available
            const timestamp = parsed.timestamp || null;
            setLastUpdated(timestamp);
            
            // If there are selections, show the selection panel
            if (useCases.length > 0) {
              setSelectionPanelVisible(true);
              // If max selections are reached, set selectionComplete to true
              if (useCases.length >= MAX_SELECTIONS) {
                setSelectionComplete(true);
              }
              
              // Update theme color based on selections
              if (useCases.length > 0) {
                const primaryCategory = useCases[0].category;
                switch (primaryCategory) {
                  case 'personal': setThemeColor('blue'); break;
                  case 'teams': setThemeColor('purple'); break;
                  case 'business': setThemeColor('green'); break;
                }
              }
              
              // Generate recommendations based on first selection
              if (useCases.length > 0 && useCases.length < MAX_SELECTIONS) {
                updateRecommendations(useCases[0].id);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading selections from storage:', error);
      }
    };
    
    loadFromStorage();
  }, []);

  // Save selected use cases to storage whenever they change
  useEffect(() => {
    try {
      // Create timestamp
      const now = new Date().toISOString();
      setLastUpdated(now);
      
      // Create storage object with use cases, notes, and timestamp
      const storageObject = {
        useCases: selectedUseCases,
        notes: userNotes,
        timestamp: now
      };
      
      storage.setItem('aiMomentSelections', JSON.stringify(storageObject));
      
      // Update theme based on selection
      if (selectedUseCases.length > 0) {
        const primaryCategory = selectedUseCases[0].category;
        switch (primaryCategory) {
          case 'personal': setThemeColor('blue'); break;
          case 'teams': setThemeColor('purple'); break;
          case 'business': setThemeColor('green'); break;
        }
      }
    } catch (error) {
      console.error('Error saving selections to storage:', error);
    }
  }, [selectedUseCases, userNotes]);

  // Show selection panel when first item is selected
  useEffect(() => {
    if (selectedUseCases.length > 0) {
      if (!selectionPanelVisible) {
        setSelectionPanelVisible(true);
      }
      
      // Generate recommendations based on selections
      if (selectedUseCases.length === 1) {
        updateRecommendations(selectedUseCases[0].id);
      }
      
      // Check if we've reached MAX_SELECTIONS
      if (selectedUseCases.length >= MAX_SELECTIONS && !selectionComplete) {
        setSelectionComplete(true);
        
        // Play completion sound if enabled
        if (soundEnabled && AUDIO.complete) {
          AUDIO.complete.play();
        }
      }
    }
  }, [selectedUseCases, selectionPanelVisible, selectionComplete, soundEnabled]);
  
  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeTooltip && !event.target) {
        setActiveTooltip(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeTooltip]);
  
  // Function to update recommendations based on selected item
  const updateRecommendations = (useCaseId: string) => {
    const selectedCase = allUseCases.find(uc => uc.id === useCaseId);
    if (selectedCase && selectedCase.relatedIds) {
      // Filter out already selected items
      const selectedIds = selectedUseCases.map(uc => uc.id);
      const newRecommendations = selectedCase.relatedIds.filter(id => !selectedIds.includes(id));
      setRecommendedItems(newRecommendations);
    }
  };

  // Handle touch start event
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move event
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end event
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard navigation
  };

  // Create particle effects
  const createParticleEffect = (x: number, y: number, color: 'blue' | 'purple' | 'green') => {
    if (!particleContainerRef.current) return;
    
    // Particle effect implementation would go here
    // This is a complex animation that would be better handled by a library
    // For simplicity, we'll skip the implementation details
  };

  // Toggle selection of a use case
  const toggleUseCaseSelection = (useCaseId: string, event?: React.MouseEvent | React.TouchEvent) => {
    const useCase = allUseCases.find(uc => uc.id === useCaseId);
    if (!useCase) return;
    
    const isSelected = isUseCaseSelected(useCaseId);
    
    // Play appropriate sound if enabled
    if (soundEnabled) {
      if (isSelected && AUDIO.deselect instanceof HTMLAudioElement) {
        AUDIO.deselect.play().catch(() => {});
      } else if (!isSelected && selectedUseCases.length < MAX_SELECTIONS && AUDIO.select instanceof HTMLAudioElement) {
        AUDIO.select.play().catch(() => {});
      }
    }
    
    // Create particle effect if event is provided
    if (event) {
      let x, y;
      if ('clientX' in event) {
        // Mouse event
        x = event.clientX;
        y = event.clientY;
      } else if ('touches' in event && event.touches[0]) {
        // Touch event
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else {
        // If we can't get coordinates, use element center
        const element = event.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
      
      createParticleEffect(x, y, getCategoryColor(useCase.category));
      
      // If selecting (not deselecting), animate the element moving to the selection panel
      if (!isSelected && event.currentTarget) {
        const element = event.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        
        // Find the selection panel element
        const selectionPanel = document.querySelector('.selection-panel');
        if (selectionPanel) {
          const panelRect = selectionPanel.getBoundingClientRect();
          
          // Create a clone of the element to animate
          const clone = element.cloneNode(true) as HTMLElement;
          clone.style.position = 'fixed';
          clone.style.top = `${rect.top}px`;
          clone.style.left = `${rect.left}px`;
          clone.style.width = `${rect.width}px`;
          clone.style.height = `${rect.height}px`;
          clone.style.zIndex = '9999';
          clone.style.transition = 'all 0.8s ease-in-out';
          clone.style.opacity = '0.9';
          clone.style.transform = 'scale(0.8)';
          
          // Add the clone to the body
          document.body.appendChild(clone);
          
          // Trigger the animation
          setTimeout(() => {
            clone.style.top = `${panelRect.top + 20}px`;
            clone.style.left = `${panelRect.left + panelRect.width / 2 - rect.width / 2}px`;
            clone.style.opacity = '0';
            clone.style.transform = 'scale(0.5)';
            
            // Remove the clone after animation completes
            setTimeout(() => {
              document.body.removeChild(clone);
            }, 800);
          }, 10);
        }
      }
    }
    
    setSelectedUseCases(prev => {
      // Check if this use case is already selected
      if (isSelected) {
        // Remove from selections
        return prev.filter(selectedUC => selectedUC.id !== useCaseId);
      } else {
        // Add to selections if limit not reached
        if (prev.length < MAX_SELECTIONS) {
          const newSelections = [...prev, useCase];
          
          // Check if we've reached the max selections
          if (newSelections.length >= MAX_SELECTIONS) {
            setSelectionComplete(true);
          }
          
          // Hide onboarding tooltip after first selection
          if (showOnboarding) {
            setShowOnboarding(false);
          }
          
          return newSelections;
        }
        return prev;
      }
    });
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedUseCases([]);
    setSelectionComplete(false);
    setUserNotes({});
    setRecommendedItems([]);
  };
  
  // Update note for a selected use case
  const updateNote = (useCaseId: string, note: string) => {
    setUserNotes(prev => ({
      ...prev,
      [useCaseId]: note
    }));
  };
  
  // Recommend items based on user's selections
  const recommendForMe = () => {
    // Only recommend if we have at least one selection but not all
    if (selectedUseCases.length === 0 || selectedUseCases.length >= MAX_SELECTIONS) {
      return;
    }
    
    // Find potential recommendations based on all current selections
    const potentialRecommendations: string[] = [];
    selectedUseCases.forEach(selection => {
      if (selection.relatedIds) {
        potentialRecommendations.push(...selection.relatedIds);
      }
    });
    
    // Filter out already selected items
    const selectedIds = selectedUseCases.map(uc => uc.id);
    const filteredRecommendations = potentialRecommendations.filter(id => !selectedIds.includes(id));
    
    // Count occurrences to find most relevant recommendations
    const counts: {[key: string]: number} = {};
    filteredRecommendations.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
    
    // Sort by count (higher is better)
    const sortedIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    
    // Select top recommendations to fill remaining slots
    const slotsRemaining = MAX_SELECTIONS - selectedUseCases.length;
    const topRecommendations = sortedIds.slice(0, slotsRemaining);
    
    // Add these recommendations to selected items
    const recommendedUseCases = allUseCases.filter(uc => topRecommendations.includes(uc.id));
    
    setSelectedUseCases(prev => [...prev, ...recommendedUseCases]);
    
    // Play selection sound if enabled
    if (soundEnabled && AUDIO.select instanceof HTMLAudioElement) {
      AUDIO.select.play().catch(() => {});
    }
    
    // If we've reached max selections, set complete
    if (selectedUseCases.length + recommendedUseCases.length >= MAX_SELECTIONS) {
      setSelectionComplete(true);
    }
  };
  
  // Toggle sound effects
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  // Share selections
  const shareSelections = () => {
    setShowSharingModal(true);
  };
  
  // Copy share URL to clipboard
  const copyShareUrl = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url)
      .then(() => {
        // Show success message (in a real implementation)
        alert('Share URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy URL: ', err);
      });
  };
  
  // Reorder selections (for priority)
  const reorderSelections = (fromIndex: number, toIndex: number) => {
    setSelectedUseCases(prev => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  // Function to check if a use case is selected
  const isUseCaseSelected = (useCaseId: string): boolean => {
    return selectedUseCases.some(useCase => useCase.id === useCaseId);
  };
  
  // Handle button click to reveal content
  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <section className={`
      bg-gray-100 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700 
      overflow-visible use-cases-section relative z-[10] w-full
      transition-colors duration-500
    `} style={{ overflow: 'visible' }}>
      {/* Particle container for animations */}
      <div 
        ref={particleContainerRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden z-50"
      ></div>
      
      {/* First-time user onboarding tooltip */}
      <OnboardingTooltip
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
        onboardingRef={onboardingRef}
        themeColor={themeColor}
      />
      
      {/* Social sharing modal */}
      <SharingModal
        showSharingModal={showSharingModal}
        setShowSharingModal={setShowSharingModal}
        shareUrl={generateShareUrl()}
        copyShareUrl={copyShareUrl}
        selectedUseCases={selectedUseCases}
        userNotes={userNotes}
      />
      
      <div className="w-full">
        {/* Section heading */}
        <SectionHeader
          themeColor={themeColor}
          selectionComplete={selectionComplete}
          uiReady={uiReady}
          buttonClicked={buttonClicked}
        />
        
        {/* What is Your AI Moment button - moved up */}
        <div className="text-center mb-8">
          <div 
            onClick={handleButtonClick}
            className={`
              inline-flex items-center text-white font-bold px-8 py-4
              rounded-lg shadow-lg transform hover:scale-105 transition-transform
              text-xl md:text-2xl cursor-pointer
              relative overflow-hidden group
              bg-gradient-to-r ${colorClasses[themeColor].gradient} from-offset-0 to-offset-100
              bg-size-200 bg-pos-0 hover:bg-pos-100
              transition-all duration-500
              ${colorClasses[themeColor].glow} shadow-lg
            `}
            aria-label="What will be your AI moment?"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[themeColor].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <span className="relative z-10">What will be your AI moment?</span>
            <svg className="w-6 h-6 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            
            <div className="absolute inset-0 -z-10">
              <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
                <defs>
                  <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                    <rect width="1" height="1" x="0" y="0" fill="rgba(255,255,255,0.1)" />
                  </pattern>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Instructions that appear after button click */}
        {buttonClicked && (
          <div className="text-center mb-8 animate-fadeIn">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Click on the cards below to select up to 3 AI use cases that interest you most.
            </p>
          </div>
        )}

        {/* Selection Display Panel */}
        <SelectionPanel
          selectedUseCases={selectedUseCases}
          selectionPanelVisible={selectionPanelVisible}
          selectionComplete={selectionComplete}
          themeColor={themeColor}
          lastUpdated={lastUpdated}
          userNotes={userNotes}
          updateNote={updateNote}
          toggleUseCaseSelection={toggleUseCaseSelection}
          reorderSelections={reorderSelections}
          clearSelections={clearSelections}
          recommendForMe={recommendForMe}
          shareSelections={shareSelections}
          maxSelections={MAX_SELECTIONS}
        />

        {/* Selection Complete Call to Action */}
        <CompletionCTA
          selectionComplete={selectionComplete}
          themeColor={themeColor}
        />
        
        {/* Single row with all use cases */}
        <SingleCategoryRow
          allUseCases={allUseCases}
          animationState={animationState}
          hoveredPill={hoveredPill}
          sectionVisibility={sectionVisibility}
          activeTooltip={activeTooltip}
          setActiveTooltip={setActiveTooltip}
          setHoveredPill={setHoveredPill}
          setAnimationState={setAnimationState}
          toggleUseCaseSelection={toggleUseCaseSelection}
          isUseCaseSelected={isUseCaseSelected}
          recommendedItems={recommendedItems}
          firstTimeUser={firstTimeUser}
          selectionComplete={selectionComplete}
          selectedUseCasesCount={selectedUseCases.length}
          maxSelections={MAX_SELECTIONS}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          handleKeyDown={handleKeyDown}
          buttonClicked={buttonClicked}
        />
        
        {/* Call to action */}
        <div 
          className={`
            mt-10 text-center
            transition-opacity duration-300
            ${selectionComplete ? 'opacity-50' : 'opacity-100'}
          `}
        >
          <a 
            href="/collaborative-ai/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg transition-colors"
            aria-label="Learn more about Collaborative AI"
          >
            <span>Learn more about Collaborative AI</span>
            <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* CSS Animations */}
      <AnimationStyles />
      
      {/* Development indicator */}
      <div className="fixed bottom-6 right-6 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg z-50">
        DEV VERSION
      </div>
    </section>
  );
};

export default UseCasesDevSection;
