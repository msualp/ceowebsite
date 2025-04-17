'use client';

import React, { useState } from 'react';
import { HiLightBulb, HiUserGroup, HiCpuChip, HiAcademicCap, HiArrowLongRight } from 'react-icons/hi2';
import { useAnimations } from '../../utils/animation-utils';
import { Glass, Button, Card, Icon, Heading, Text, Paragraph, Label, Caption } from '../../components/ui';

export default function DesignSystemPage() {
  // State for interactive examples
  const [activeTab, setActiveTab] = useState('components');
  
  // Initialize animations - re-run when tab changes
  useAnimations(activeTab);
  
  // Debug function to log tab changes
  const handleTabChange = (tab: string) => {
    console.log(`Changing tab to: ${tab}`);
    setActiveTab(tab);
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Heading level={1} className="mb-8">Design System</Heading>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'components' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => handleTabChange('components')}
        >
          Components
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'typography' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => handleTabChange('typography')}
        >
          Typography
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'colors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => handleTabChange('colors')}
        >
          Colors
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'animations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => handleTabChange('animations')}
        >
          Animations
        </button>
      </div>
      
      {/* Debug: Current active tab */}
      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 mb-4 rounded text-sm">
        Current active tab: <strong>{activeTab}</strong>
      </div>
      
      {/* Components Tab */}
      {activeTab === 'components' && (
        <div className="space-y-12">
          {/* Glass Component */}
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Glass Component</Heading>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Glass variant="default" className="p-6">
                <Text>Default Glass</Text>
              </Glass>
              
              <Glass variant="blue" className="p-6">
                <Text>Blue Glass</Text>
              </Glass>
              
              <Glass variant="purple" className="p-6">
                <Text>Purple Glass</Text>
              </Glass>
              
              <Glass variant="green" className="p-6">
                <Text>Green Glass</Text>
              </Glass>
              
              <Glass variant="amber" className="p-6">
                <Text>Amber Glass</Text>
              </Glass>
              
              <Glass variant="default" intensity="heavy" className="p-6">
                <Text>Heavy Intensity</Text>
              </Glass>
              
              <Glass variant="default" hover={true} className="p-6">
                <Text>With Hover Effect</Text>
              </Glass>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { Glass } from '@/components/ui';

<Glass variant="blue" intensity="medium" hover={true} className="p-6">
  <p>Content goes here</p>
</Glass>`}
              </pre>
            </div>
          </section>
          
          {/* Button Component */}
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Button Component</Heading>
            
            <div className="space-y-6">
              <div>
                <Heading level={3} className="mb-4">Variants</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="text">Text</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Sizes</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">With Icons</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" icon={<HiArrowLongRight />}>Right Icon</Button>
                  <Button variant="primary" icon={<HiLightBulb />} iconPosition="left">Left Icon</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">States</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" fullWidth>Full Width</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">As Links</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" href="#">Internal Link</Button>
                  <Button variant="outline" href="https://example.com" external>External Link</Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { Button } from '@/components/ui';
import { HiArrowLongRight } from 'react-icons/hi2';

<Button 
  variant="primary" 
  size="md" 
  icon={<HiArrowLongRight />}
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>`}
              </pre>
            </div>
          </section>
          
          {/* Card Component */}
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Card Component</Heading>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="default">
                <Heading level={3} className="mb-2">Default Card</Heading>
                <Paragraph>This is a default card with standard styling.</Paragraph>
              </Card>
              
              <Card variant="glass">
                <Heading level={3} className="mb-2">Glass Card</Heading>
                <Paragraph>This card has a glass morphism effect.</Paragraph>
              </Card>
              
              <Card variant="outlined">
                <Heading level={3} className="mb-2">Outlined Card</Heading>
                <Paragraph>This card has an outlined style with no background.</Paragraph>
              </Card>
              
              <Card variant="elevated">
                <Heading level={3} className="mb-2">Elevated Card</Heading>
                <Paragraph>This card has an elevated style with shadow.</Paragraph>
              </Card>
              
              <Card variant="default" size="sm">
                <Heading level={3} className="mb-2">Small Card</Heading>
                <Paragraph>This card has smaller padding.</Paragraph>
              </Card>
              
              <Card variant="default" hover={true}>
                <Heading level={3} className="mb-2">Hover Card</Heading>
                <Paragraph>This card has a hover effect. Try hovering over it!</Paragraph>
              </Card>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { Card, Heading, Paragraph } from '@/components/ui';

<Card variant="glass" size="md" hover={true}>
  <Heading level={3} className="mb-2">Card Title</Heading>
  <Paragraph>Card content goes here.</Paragraph>
</Card>`}
              </pre>
            </div>
          </section>
          
          {/* Icon Component */}
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Icon Component</Heading>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="lg" color="primary" />
                <Caption className="mt-2">Primary</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiUserGroup />} size="lg" color="success" />
                <Caption className="mt-2">Success</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiCpuChip />} size="lg" color="warning" />
                <Caption className="mt-2">Warning</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiAcademicCap />} size="lg" color="danger" />
                <Caption className="mt-2">Danger</Caption>
              </div>
            </div>
            
            <Heading level={3} className="mt-8 mb-4">Sizes</Heading>
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="xs" />
                <Caption className="mt-2">XS</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="sm" />
                <Caption className="mt-2">SM</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="md" />
                <Caption className="mt-2">MD</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="lg" />
                <Caption className="mt-2">LG</Caption>
              </div>
              
              <div className="flex flex-col items-center">
                <Icon icon={<HiLightBulb />} size="xl" />
                <Caption className="mt-2">XL</Caption>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { Icon } from '@/components/ui';
import { HiLightBulb } from 'react-icons/hi2';

<Icon 
  icon={<HiLightBulb />} 
  size="md" 
  color="primary" 
/>`}
              </pre>
            </div>
          </section>
        </div>
      )}
      
      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <div className="space-y-12 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Typography Components</h2>
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Typography Components</Heading>
            
            <div className="space-y-8">
              <div>
                <Heading level={3} className="mb-4">Heading Component</Heading>
                <div className="space-y-4">
                  <Heading level={1}>Heading 1</Heading>
                  <Heading level={2}>Heading 2</Heading>
                  <Heading level={3}>Heading 3</Heading>
                  <Heading level={4}>Heading 4</Heading>
                  <Heading level={5}>Heading 5</Heading>
                  <Heading level={6}>Heading 6</Heading>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Text Component</Heading>
                <div className="space-y-4">
                  <Text size="xs">Extra Small Text</Text>
                  <Text size="sm">Small Text</Text>
                  <Text size="base">Base Text</Text>
                  <Text size="lg">Large Text</Text>
                  <Text size="xl">Extra Large Text</Text>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Text Weights</Heading>
                <div className="space-y-4">
                  <Text weight="normal">Normal Weight</Text>
                  <Text weight="medium">Medium Weight</Text>
                  <Text weight="semibold">Semibold Weight</Text>
                  <Text weight="bold">Bold Weight</Text>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Text Colors</Heading>
                <div className="space-y-4">
                  <Text color="default">Default Color</Text>
                  <Text color="muted">Muted Color</Text>
                  <Text color="primary">Primary Color</Text>
                  <Text color="success">Success Color</Text>
                  <Text color="warning">Warning Color</Text>
                  <Text color="danger">Danger Color</Text>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Paragraph Component</Heading>
                <Paragraph>
                  This is a paragraph component with proper spacing and line height.
                  It's designed to make text more readable and consistent across the site.
                  The paragraph component automatically adds margin to the bottom for proper spacing.
                </Paragraph>
                <Paragraph>
                  This is another paragraph that demonstrates the spacing between paragraphs.
                  Notice how there's a consistent margin between these paragraphs.
                </Paragraph>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Label Component</Heading>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="example-input">Regular Label</Label>
                    <input id="example-input" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <Label htmlFor="required-input" required>Required Label</Label>
                    <input id="required-input" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Caption Component</Heading>
                <div className="space-y-2">
                  <Caption>This is a caption for small, secondary text.</Caption>
                  <Caption>It's useful for image captions, form field hints, and other secondary information.</Caption>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { Heading, Text, Paragraph, Label, Caption } from '@/components/ui';

<Heading level={2}>Section Title</Heading>
<Paragraph>This is a paragraph of text.</Paragraph>
<Label htmlFor="email" required>Email Address</Label>
<Caption>We'll never share your email with anyone else.</Caption>`}
              </pre>
            </div>
          </section>
        </div>
      )}
      
      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-12 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Color System</h2>
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Color System</Heading>
            
            <div className="space-y-8">
              <div>
                <Heading level={3} className="mb-4">Primary Colors</Heading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <div className="h-20 bg-blue-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Blue 600</Text>
                      <Caption>Primary</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-blue-500 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Blue 500</Text>
                      <Caption>Secondary</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-blue-700 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Blue 700</Text>
                      <Caption>Hover</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-blue-100 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Blue 100</Text>
                      <Caption>Background</Caption>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Semantic Colors</Heading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <div className="h-20 bg-green-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Green 600</Text>
                      <Caption>Success</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-amber-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Amber 600</Text>
                      <Caption>Warning</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-red-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Red 600</Text>
                      <Caption>Danger</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-purple-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Purple 600</Text>
                      <Caption>Info</Caption>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Neutral Colors</Heading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <div className="h-20 bg-gray-900 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Gray 900</Text>
                      <Caption>Text (Dark)</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-gray-600 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Gray 600</Text>
                      <Caption>Secondary Text</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-gray-300 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Gray 300</Text>
                      <Caption>Border</Caption>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="h-20 bg-gray-100 rounded-t-md"></div>
                    <div className="p-2 border border-t-0 rounded-b-md">
                      <Text size="sm" weight="medium">Gray 100</Text>
                      <Caption>Background</Caption>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      
      {/* Animations Tab */}
      {activeTab === 'animations' && (
        <div className="space-y-12 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Animation System</h2>
          <section className="mb-16 fade-in-scroll">
            <Heading level={2} className="mb-6 border-b pb-2">Animation System</Heading>
            
            <div className="space-y-8">
              <div>
                <Heading level={3} className="mb-4">Fade In on Scroll</Heading>
                <div className="space-y-4">
                  <div className="fade-in-scroll bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <Text>This element fades in when it enters the viewport.</Text>
                    <Text className="mt-2">Add the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">fade-in-scroll</code> class to any element.</Text>
                  </div>
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Staggered Fade In</Heading>
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
                <Text className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  Add the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">stagger-fade-in</code> class to the parent element.
                </Text>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Hover Animations</Heading>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="hover-scale bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <Text>Hover over me to see a subtle scale effect.</Text>
                  </div>
                  
                  <div className="hover-lift bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <Text>Hover over me to see a card lift effect with shadow.</Text>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-center">
                    <Icon icon={<HiLightBulb />} size="xl" className="icon-hover" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <Heading level={4} className="mb-2">Usage</Heading>
              <pre className="text-sm overflow-x-auto p-2 bg-gray-200 dark:bg-gray-900 rounded">
                {`import { useAnimations } from '@/utils/animation-utils';

// In your component
function MyComponent() {
  // Initialize animations
  useAnimations();
  
  return (
    <div>
      <div className="fade-in-scroll">
        This will fade in when scrolled into view
      </div>
      
      <ul className="stagger-fade-in">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
}`}
              </pre>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
