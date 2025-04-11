'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initAllAnimations } from '@/lib/animation-utils';
import {
  HiLightBulb,
  HiUserGroup,
  HiCpuChip,
  HiAcademicCap,
  HiArrowLongRight,
} from 'react-icons/hi2';

/**
 * DesignSystem Component
 * 
 * This component demonstrates the global styles and animations
 * that can be used across the site for consistent design elements.
 */
export default function DesignSystem() {
  // Initialize animations when component mounts
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Design System</h1>
      
      {/* Image Effects Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Image Effects</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Grayscale to Color Animation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Grayscale to Color Animation</h3>
            <div className="group relative rounded-xl overflow-hidden">
              <Image
                src="/images/mustafa-sualp-working.png"
                alt="Grayscale to Color Example"
                width={400}
                height={300}
                className="w-full h-auto img-grayscale"
              />
              <div className="caption-reveal">
                Image caption appears on hover
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Hover over the image to see the grayscale to color transition and caption reveal.
            </p>
          </div>
          
          {/* Image with Caption */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Image with Caption (img-with-caption)</h3>
            <div className="img-with-caption relative rounded-xl overflow-hidden">
              <Image
                src="/images/Mustafa-Sualp-with-AEFIS-Team.png"
                alt="Image with Caption Example"
                width={400}
                height={300}
                className="w-full h-auto"
              />
              <div className="caption-reveal">
                This caption is revealed on hover using the img-with-caption class
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              The img-with-caption class automatically applies grayscale and caption effects.
            </p>
          </div>
        </div>
      </section>
      
      {/* Scroll Animations Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Scroll Animations</h2>
        
        <div className="space-y-8">
          {/* Fade In on Scroll */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Fade In on Scroll</h3>
            <div className="fade-in-scroll bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p>This element fades in when it enters the viewport.</p>
              <p className="mt-2">Add the <code>fade-in-scroll</code> class to any element.</p>
            </div>
          </div>
          
          {/* Staggered Fade In */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Staggered Fade In for Lists</h3>
            <ul className="stagger-fade-in grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <li 
                  key={item}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  Item {item} - These items fade in one after another
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Add the <code>stagger-fade-in</code> class to the parent element.
            </p>
          </div>
        </div>
      </section>
      
      {/* Hover Animations Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Hover Animations</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Subtle Scale */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subtle Scale</h3>
            <div className="hover-scale bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p>Hover over me to see a subtle scale effect.</p>
            </div>
          </div>
          
          {/* Card Lift */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Card Lift</h3>
            <div className="hover-lift bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p>Hover over me to see a card lift effect with shadow.</p>
            </div>
          </div>
          
          {/* Icon Color Change */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Icon Color Change</h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-center">
              <HiLightBulb className="w-12 h-12 icon-hover" />
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm text-center">
              Hover over the icon to see the color change to green.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mac Glass Effect Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Mac Glass Effect</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Default Glass */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Default Glass</h3>
            <div className="mac-glass p-6 rounded-xl">
              <p>This uses the default mac-glass class.</p>
            </div>
          </div>
          
          {/* Blue Glass */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Blue Glass</h3>
            <div className="mac-glass-blue p-6 rounded-xl">
              <p>This uses the mac-glass-blue class.</p>
            </div>
          </div>
          
          {/* Purple Glass */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Purple Glass</h3>
            <div className="mac-glass-purple p-6 rounded-xl">
              <p>This uses the mac-glass-purple class.</p>
            </div>
          </div>
          
          {/* Data Attribute Glass */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Using Data Attributes</h3>
            <div data-glass="blue" className="p-6 rounded-xl">
              <p>This uses data-glass="blue" attribute.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modern Flat Icon Styles Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Modern Flat Icon Styles</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Icon Examples */}
          <div className="text-center">
            <div className="icon-container mx-auto mb-2">
              <HiLightBulb className="w-6 h-6" />
            </div>
            <p className="text-sm">Lightbulb</p>
          </div>
          
          <div className="text-center">
            <div className="icon-container mx-auto mb-2">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <p className="text-sm">User Group</p>
          </div>
          
          <div className="text-center">
            <div className="icon-container mx-auto mb-2">
              <HiCpuChip className="w-6 h-6" />
            </div>
            <p className="text-sm">CPU Chip</p>
          </div>
          
          <div className="text-center">
            <div className="icon-container mx-auto mb-2">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <p className="text-sm">Academic Cap</p>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          Hover over the icons to see the color change and lift effect.
        </p>
      </section>
      
      {/* Spacing Utilities Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Spacing Utilities</h2>
        
        <div className="space-y-8">
          {/* Vertical Rhythm */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Vertical Rhythm</h3>
            <div className="v-rhythm-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p>This is the first paragraph.</p>
              <p>This paragraph has margin-top applied by v-rhythm-md.</p>
              <p>This paragraph also has margin-top applied.</p>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Add the <code>v-rhythm-sm</code>, <code>v-rhythm-md</code>, or <code>v-rhythm-lg</code> class to the parent element.
            </p>
          </div>
          
          {/* Content Breathing */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Content Breathing</h3>
            <div className="content-breathing bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold">Section Title</h4>
              <p>This content has proper spacing for readability. The line height and max-width are optimized for comfortable reading.</p>
              <p>Additional paragraphs have proper spacing between them to create a pleasant reading experience.</p>
              <h4 className="text-lg font-semibold">Another Section</h4>
              <p>Headings also have proper spacing above and below them.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Button Examples Section */}
      <section className="mb-16 fade-in-scroll">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Button Examples</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Primary Button */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Primary Button</h3>
            <button className="btn-hover bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md w-full">
              Primary Button
            </button>
          </div>
          
          {/* Secondary Button */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Secondary Button</h3>
            <button className="btn-hover border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors w-full">
              Secondary Button
            </button>
          </div>
          
          {/* Button with Icon */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Button with Icon</h3>
            <button className="btn-hover bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md w-full flex items-center justify-center">
              <span>Button with Icon</span>
              <HiArrowLongRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Usage Instructions */}
      <section className="mb-16 fade-in-scroll mac-glass p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">How to Use These Styles</h2>
        
        <div className="space-y-4">
          <p>
            1. Import the global styles in your <code>global.css</code> file:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code>{`@import './global-effects.css';`}</code>
          </pre>
          
          <p>
            2. For scroll animations, initialize them in your component:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code>{`import { useEffect } from 'react';
import { initAllAnimations } from '@/lib/animation-utils';

export default function YourComponent() {
  useEffect(() => {
    const cleanup = initAllAnimations();
    return cleanup;
  }, []);
  
  return (
    <div className="fade-in-scroll">
      {/* Your content here */}
    </div>
  );
}`}</code>
          </pre>
          
          <p>
            3. Apply the classes to your elements as needed:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code>{`<div className="hover-lift mac-glass-blue">
  {/* Your content here */}
</div>`}</code>
          </pre>
        </div>
      </section>
      
      {/* Call to Action */}
      <div className="text-center fade-in-scroll">
        <Link 
          href="/docs/design-system"
          className="btn-hover inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          View Full Documentation
          <HiArrowLongRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
