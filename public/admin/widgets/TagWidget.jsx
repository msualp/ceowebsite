import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

/**
 * Custom tag widget for Netlify CMS
 * This widget provides a more user-friendly interface for selecting tags
 * with support for tag categories (theme, type, time)
 */

// Tag categories with colors
const tagCategories = {
  theme: {
    label: 'Themes',
    color: '#3b82f6', // blue-500
    tags: [
      'idea-economy',
      'ai-tools',
      'collaborative-ai',
      'emotional-intelligence',
      'productivity',
      'cognitive-mapping',
      'real-time',
      'entrepreneurship',
      'future-of-work',
      'open-source',
      'edtech',
      'communication',
      'legacy',
      'ai-culture'
    ]
  },
  type: {
    label: 'Types',
    color: '#8b5cf6', // purple-500
    tags: [
      'personal-reflection',
      'thought-piece',
      'framework',
      'trend-analysis',
      'visionary',
      'satire',
      'insight',
      'how-it-works'
    ]
  },
  time: {
    label: 'Timeline',
    color: '#10b981', // emerald-500
    tags: [
      'present',
      'future',
      'history',
      'retrospective'
    ]
  }
};

// Helper to determine tag category
const getTagCategory = (tag) => {
  for (const [category, data] of Object.entries(tagCategories)) {
    if (data.tags.includes(tag)) {
      return category;
    }
  }
  return null;
};

// Helper to get tag color
const getTagColor = (tag) => {
  const category = getTagCategory(tag);
  return category ? tagCategories[category].color : '#6b7280'; // gray-500 default
};

// Control component (editing interface)
export const Control = ({ onChange, value, field }) => {
  // Convert value to array if it's not already
  const tags = value ? (Array.isArray(value) ? value : [value]) : [];
  
  // Handle tag selection
  const handleTagToggle = (tag) => {
    const newTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag];
    
    onChange(newTags);
  };
  
  return (
    <div>
      {Object.entries(tagCategories).map(([categoryKey, category]) => (
        <div key={categoryKey} className="mb-6">
          <h3 className="text-lg font-medium mb-2" style={{ color: category.color }}>
            {category.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.tags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  tags.includes(tag)
                    ? 'bg-opacity-100 text-white'
                    : 'bg-opacity-20 text-gray-700 hover:bg-opacity-30'
                }`}
                style={{ 
                  backgroundColor: tags.includes(tag) 
                    ? category.color 
                    : `${category.color}33` // 20% opacity
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Control.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  field: PropTypes.object,
};

// Preview component (how it appears in the preview)
export const Preview = ({ value }) => {
  // Convert value to array if it's not already
  const tags = value ? (Array.isArray(value) ? value : [value]) : [];
  
  if (!tags.length) {
    return <div className="text-gray-500">No tags selected</div>;
  }
  
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(tag => (
        <span
          key={tag}
          className="px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: getTagColor(tag) }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

Preview.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};
