'use client';

import React from 'react';
import { UseCase, ColorName, colorClasses, getCategoryColor } from './types';

interface SelectionPanelProps {
  selectedUseCases: UseCase[];
  selectionPanelVisible: boolean;
  selectionComplete: boolean;
  themeColor: ColorName;
  lastUpdated: string | null;
  userNotes: Record<string, string>;
  updateNote: (useCaseId: string, note: string) => void;
  toggleUseCaseSelection: (useCaseId: string) => void;
  reorderSelections: (fromIndex: number, toIndex: number) => void;
  clearSelections: () => void;
  recommendForMe: () => void;
  shareSelections: () => void;
  maxSelections: number;
}

const SelectionPanel: React.FC<SelectionPanelProps> = ({
  selectedUseCases,
  selectionPanelVisible,
  selectionComplete,
  themeColor,
  lastUpdated,
  userNotes,
  updateNote,
  toggleUseCaseSelection,
  reorderSelections,
  clearSelections,
  recommendForMe,
  shareSelections,
  maxSelections
}) => {
  return (
    <div 
      className={`
        max-w-4xl mx-auto px-6 md:px-8 
        transition-all duration-500 ease-in-out 
        ${selectionPanelVisible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}
        mb-8 selection-panel
      `}
    >
      <div 
        className={`
          bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
          border ${colorClasses[themeColor].border}
          transition-all duration-300
          ${selectedUseCases.length > 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
            Your AI Moments
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              {selectedUseCases.length}/{maxSelections} selected
            </span>
          </h3>
          <div className="flex space-x-2">
            {/* "Recommend for me" button - only show if we have at least one selection but not full */}
            {selectedUseCases.length > 0 && selectedUseCases.length < maxSelections && (
              <button 
                onClick={recommendForMe}
                className={`text-sm bg-${themeColor}-50 text-${themeColor}-600 dark:bg-${themeColor}-900/30 dark:text-${themeColor}-400 hover:bg-${themeColor}-100 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 rounded-md px-3 py-1`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Recommend
                </span>
              </button>
            )}
            
            {/* Share button - only show if we have at least one selection */}
            {selectedUseCases.length > 0 && (
              <button 
                onClick={shareSelections}
                className="text-sm bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-3 py-1"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </span>
              </button>
            )}
            
            <button 
              onClick={clearSelections}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-2 py-1"
            >
              Clear All
            </button>
          </div>
        </div>
        
        {/* Last updated timestamp */}
        {lastUpdated && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
        
        <div className="space-y-3">
          {selectedUseCases.length > 0 ? (
            selectedUseCases.map((useCase, index) => {
              const color = getCategoryColor(useCase.category);
              const colorClass = colorClasses[color];
              const note = userNotes[useCase.id] || '';
              
              return (
                <div 
                  key={`selected-${useCase.id}`} 
                  className={`
                    flex flex-col
                    px-4 py-3 rounded-lg ${colorClass.highlight} 
                    border ${colorClass.border}
                    animate-fadeIn
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Clickable checkmark to unselect */}
                      <div 
                        className={`
                          w-6 h-6 rounded-md mr-3 flex-shrink-0 border-2 ${colorClass.border}
                          flex items-center justify-center
                          transition-all duration-200 ease-in-out
                          ${colorClass.bg} cursor-pointer hover:opacity-80
                        `} 
                        onClick={() => toggleUseCaseSelection(useCase.id)}
                        aria-label={`Unselect ${useCase.text}`}
                      >
                        <svg 
                          className="w-4 h-4 text-white dark:text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200">{useCase.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Priority indicator (1-3) */}
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        #{index + 1}
                      </div>
                      
                      {/* Move up button (not for first item) */}
                      {index > 0 && (
                        <button 
                          onClick={() => reorderSelections(index, index - 1)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Move up in priority"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Move down button (not for last item) */}
                      {index < selectedUseCases.length - 1 && (
                        <button 
                          onClick={() => reorderSelections(index, index + 1)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Move down in priority"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                      
                      <button 
                        onClick={() => toggleUseCaseSelection(useCase.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        aria-label={`Remove ${useCase.text}`}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Optional note input */}
                  <div className="mt-2">
                    <textarea
                      placeholder="Why this matters to you? (optional)"
                      value={note}
                      onChange={(e) => updateNote(useCase.id, e.target.value)}
                      className="w-full text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded p-2 placeholder-gray-400 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={1}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400 italic">
              Select some use cases below to create your AI journey...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectionPanel;
