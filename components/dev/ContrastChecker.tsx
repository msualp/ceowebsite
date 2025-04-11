'use client';

import { useState, useEffect } from 'react';
import { 
  checkContrast, 
  formatContrastRatio, 
  getContrastStatusText, 
  getContrastStatusColor,
  commonColorCombinations
} from '@/lib/contrast-checker';

/**
 * Development-only component for checking color contrast
 * This component provides a UI for testing color combinations against WCAG guidelines
 */
export function ContrastChecker() {
  const [isVisible, setIsVisible] = useState(false);
  const [foreground, setForeground] = useState('#1f2937');
  const [background, setBackground] = useState('#ffffff');
  const [contrastResult, setContrastResult] = useState(checkContrast(foreground, background));
  const [extractedColors, setExtractedColors] = useState<{name: string, color: string}[]>([]);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useEffect(() => {
    // Update contrast result when colors change
    setContrastResult(checkContrast(foreground, background));
  }, [foreground, background]);

  useEffect(() => {
    if (isVisible) {
      // Extract colors from the page when the component becomes visible
      extractColorsFromPage();
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const extractColorsFromPage = () => {
    const colors: {name: string, color: string}[] = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;
      const tagName = el.tagName.toLowerCase();
      
      // Only add unique colors
      if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && !colors.some(c => c.color === backgroundColor)) {
        colors.push({
          name: `Background (${tagName})`,
          color: rgbToHex(backgroundColor)
        });
      }
      
      if (color && !colors.some(c => c.color === color)) {
        colors.push({
          name: `Text (${tagName})`,
          color: rgbToHex(color)
        });
      }
    });
    
    setExtractedColors(colors.slice(0, 20)); // Limit to 20 colors to avoid overwhelming the UI
  };

  // Convert RGB color to hex
  const rgbToHex = (rgb: string): string => {
    // Handle rgba format
    const rgbMatch = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (!rgbMatch) return '#000000';
    
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const setColorPair = (fg: string, bg: string) => {
    setForeground(fg);
    setBackground(bg);
  };

  return (
    <>
      {/* Contrast checker button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-16 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
        aria-label="Toggle Contrast Checker"
        title="Toggle Contrast Checker"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"></path>
          <path d="M12 2v20"></path>
        </svg>
      </button>
      
      {/* Contrast checker panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-16 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-96 max-h-[80vh] overflow-auto">
          <h2 className="text-lg font-bold mb-4">Contrast Checker</h2>
          
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <label htmlFor="foreground" className="block mb-1 text-sm font-medium">
                  Foreground (Text)
                </label>
                <div className="flex">
                  <input
                    type="color"
                    id="foreground"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded-l-md"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md text-sm"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="background" className="block mb-1 text-sm font-medium">
                  Background
                </label>
                <div className="flex">
                  <input
                    type="color"
                    id="background"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded-l-md"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Preview */}
            <div 
              className="p-4 rounded-md border border-gray-300 mb-2 text-center"
              style={{ backgroundColor: background, color: foreground }}
            >
              <span className="text-sm">Normal Text</span>
              <h3 className="text-xl font-bold">Large Text (18pt bold or 24pt)</h3>
            </div>
            
            {/* Results */}
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Contrast Ratio:</span>
                <span className="font-bold">{formatContrastRatio(contrastResult.ratio)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <span 
                  className="font-bold px-2 py-1 rounded-md text-white"
                  style={{ backgroundColor: getContrastStatusColor(contrastResult) }}
                >
                  {getContrastStatusText(contrastResult)}
                </span>
              </div>
              
              <div className="mt-2 text-sm grid grid-cols-2 gap-2">
                <div className={`p-1 rounded ${contrastResult.AA_normal ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                  AA Normal: {contrastResult.AA_normal ? '✓' : '✗'}
                </div>
                <div className={`p-1 rounded ${contrastResult.AA_large ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                  AA Large: {contrastResult.AA_large ? '✓' : '✗'}
                </div>
                <div className={`p-1 rounded ${contrastResult.AAA_normal ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                  AAA Normal: {contrastResult.AAA_normal ? '✓' : '✗'}
                </div>
                <div className={`p-1 rounded ${contrastResult.AAA_large ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                  AAA Large: {contrastResult.AAA_large ? '✓' : '✗'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Common color combinations */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Common Color Combinations</h3>
            <div className="space-y-2">
              {commonColorCombinations.map((combo, index) => (
                <button
                  key={index}
                  onClick={() => setColorPair(combo.foreground, combo.background)}
                  className="block w-full text-left p-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <span>{combo.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-sm border border-gray-400" style={{ backgroundColor: combo.foreground }}></div>
                      <span>on</span>
                      <div className="w-4 h-4 rounded-sm border border-gray-400" style={{ backgroundColor: combo.background }}></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Extracted colors */}
          {extractedColors.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Colors from Page</h3>
              <div className="grid grid-cols-2 gap-2">
                {extractedColors.map((color, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      if (color.name.startsWith('Background')) {
                        setBackground(color.color);
                      } else {
                        setForeground(color.color);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-sm border border-gray-400" 
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <div className="overflow-hidden">
                        <div className="text-xs truncate">{color.name}</div>
                        <div className="text-xs font-mono">{color.color}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={extractColorsFromPage}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Extract Colors
            </button>
            
            <button
              onClick={toggleVisibility}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
