'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Download, Code, Layers, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { componentGroups } from '../data';
import { Component } from '../types';

export default function ComponentDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [component, setComponent] = useState<Component | null>(null);
  const [componentGroup, setComponentGroup] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('default');
  
  useEffect(() => {
    // Find the component that matches the slug
    let foundComponent: Component | null = null;
    let foundGroup: string | null = null;
    
    componentGroups.forEach(group => {
      const match = group.components.find(comp => 
        comp.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (match) {
        foundComponent = match;
        foundGroup = group.title;
      }
    });
    
    if (foundComponent) {
      setComponent(foundComponent);
      setComponentGroup(foundGroup);
      
      // Get variant from URL if present
      const searchParams = new URLSearchParams(window.location.search);
      const variant = searchParams.get('variant');
      if (variant) {
        setSelectedVariant(variant);
      }
    } else {
      // If no component is found, redirect back to the components page
      router.push('/ui-components');
    }
  }, [slug, router]);

  // Handle copy code to clipboard
  const handleCopyCode = () => {
    if (component) {
      // Generate a fully functional, self-contained component
      const componentCode = getComponentCode(component, componentGroup);
      
      navigator.clipboard.writeText(componentCode);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  // Get random tailwind colors for examples
  const getRandomTailwindColor = () => {
    const colors = ['blue', 'green', 'red', 'purple', 'yellow', 'indigo', 'pink'];
    const shades = ['400', '500', '600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShade = shades[Math.floor(Math.random() * shades.length)];
    return `${randomColor}-${randomShade}`;
  };
  
  // Function to get available variants for this component
  const getComponentVariants = () => {
    if (!component || !componentGroup) return [];
    
    // Use the variants from the componentGroups data
    const group = componentGroups.find(g => g.title === componentGroup);
    if (!group || !group.variants) return [];
    
    return group.variants[component.name] || [];
  };

  // Add the variant selection dropdown after the tab buttons
  const renderVariantSelector = () => {
    const variants = getComponentVariants();
    if (variants.length === 0) return null;
    
    return (
      <div className="flex items-center ml-auto">
        <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">Variant:</span>
        <select
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          className="text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {variants.map(variant => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  // Add a function to generate component code
  const getComponentCode = (component: Component, groupName: string | null): string => {
    if (!component || !groupName) return '';
    
    // Find the component group in componentGroups
    const group = componentGroups.find(g => g.title === groupName);
    if (!group) return '';
    
    // If the group has a componentCode function for this component, use it
    if (group.componentCode && group.componentCode[component.name]) {
      return group.componentCode[component.name](selectedVariant);
    }
    
    // If the variant has a specific code, use it
    const variants = group.variants?.[component.name] || [];
    const variant = variants.find(v => v.id === selectedVariant);
    if (variant && variant.code) {
      return variant.code;
    }
    
    // Default fallback code if nothing is defined in the data
    return `import React from 'react';

/**
 * ${component.name} Component - ${selectedVariant} variant
 * ${component.description}
 */
export function ${component.name.replace(/\s+/g, '')}({ 
  children,
  className = '',
  variant = '${selectedVariant}',
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children || '${component.name} Content'}
    </div>
  );
}`;
  };
  
  // Function to render the component preview based on the component and selected variant
  const renderComponentPreview = () => {
    if (!component || !componentGroup) return null;
    
    const group = componentGroups.find(g => g.title === componentGroup);
    if (!group) return null;
    
    // Get the variant object
    const variants = group.variants?.[component.name] || [];
    const variant = variants.find(v => v.id === selectedVariant) || { 
      id: selectedVariant, 
      name: selectedVariant, 
      description: '' 
    };
    
    // Use custom preview renderer if defined in the data
    if (group.renderPreview && 
        group.renderPreview[component.name] && 
        group.renderPreview[component.name][selectedVariant]) {
      return group.renderPreview[component.name][selectedVariant](variant);
    }
    
    // If there's previewCode defined in the variant, use it
    if (variant.previewCode) {
      // This would need a proper JSX parser to work, so this is just a placeholder
      // In a real implementation, you might use something like react-live or a sandbox
      return <div dangerouslySetInnerHTML={{ __html: variant.previewCode }} />;
    }
    
    // Default fallback implementations based on group type
    if (componentGroup.includes('Basic')) {
      return (
        <div className="flex items-center justify-center p-10">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedVariant === 'primary' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : selectedVariant === 'secondary'
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : selectedVariant === 'outline'
                ? 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
                : selectedVariant === 'disabled'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                : selectedVariant === 'icon'
                ? 'bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
            disabled={selectedVariant === 'disabled'}
          >
            {selectedVariant === 'icon' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
            {component.name}
          </button>
        </div>
      );
    } else if (componentGroup.includes('Layout')) {
      return (
        <div className="p-6">
          <div className={`w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
            selectedVariant === 'shadowed' ? 'shadow-md' : ''
          } ${
            selectedVariant === 'bordered' || selectedVariant === 'standard' ? 'border border-gray-200 dark:border-gray-700' : ''
          }`}>
            {(selectedVariant === 'header' || selectedVariant === 'with-header') && (
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{component.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{component.description}</p>
              </div>
            )}
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300">This is a sample {component.name.toLowerCase()} content area. You can use this component to organize and display your content.</p>
              <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md mt-4">
                <p className="text-gray-500 dark:text-gray-400">Content area</p>
              </div>
            </div>
            {(selectedVariant === 'footer' || selectedVariant === 'with-footer') && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Action</button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (componentGroup.includes('Navigation')) {
      return (
        <div className="p-4">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-3 flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">N</div>
              <div className={`ml-4 flex gap-4 ${selectedVariant === 'centered' ? 'mx-auto' : ''}`}>
                <a href="#" className="px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">Home</a>
                <a href="#" className="px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 text-sm font-medium">Features</a>
                <a href="#" className="px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 text-sm font-medium">Pricing</a>
              </div>
              {selectedVariant === 'with-dropdown' && (
                <div className="ml-auto">
                  <button className="text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                      <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                      <path d="M12 3v6"></path>
                    </svg>
                  </button>
                </div>
              )}
              {selectedVariant === 'responsive' && (
                <div className="ml-auto">
                  <button className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {selectedVariant === 'with-dropdown' && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 text-sm">Account settings</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 text-sm">Support</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 text-sm">Sign out</a>
              </div>
            )}
          </div>
        </div>
      );
    } else if (componentGroup.includes('Feedback')) {
      const colors = {
        info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300',
        success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300',
        warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300',
        'with-action': 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300'
      };
      
      return (
        <div className="p-6">
          <div className={`w-full rounded-lg border p-4 flex ${colors[selectedVariant as keyof typeof colors] || colors.info}`}>
            <div className="flex-shrink-0 mr-3">
              {selectedVariant === 'info' && (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
              {selectedVariant === 'success' && (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {selectedVariant === 'warning' && (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {selectedVariant === 'error' && (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {selectedVariant === 'with-action' && (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium">{variant.name}</h3>
              <p className="text-sm mt-1">{component.description}</p>
              {selectedVariant === 'with-action' && (
                <div className="mt-3 flex gap-2">
                  <button className="px-2 py-1 text-xs bg-current bg-opacity-100 text-white rounded">Action</button>
                  <button className="px-2 py-1 text-xs border border-current rounded">Dismiss</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Default fallback for any other component
    return (
      <div className="flex items-center justify-center p-8">
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 max-w-md">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">{component.name} - {variant.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{component.description}</p>
        </div>
      </div>
    );
  };
  
  // Handle downloading the component code as a file
  const handleDownload = () => {
    if (component) {
      // Get the component code using the data-driven function
      const componentCode = getComponentCode(component, componentGroup);
      
      // Create a blob with the code
      const blob = new Blob([componentCode], { type: 'text/javascript' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${component.name.replace(/\s+/g, '')}.jsx`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };
  
  if (!component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center p-8">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.25] dark:opacity-30 [filter:invert(0.2)] dark:[filter:invert(0.8)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '3px',
              height: '3px',
              background: 'currentColor',
              opacity: 0.6,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '2px',
              height: '2px',
              background: 'currentColor',
              opacity: 0.5,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Breadcrumb and header */}
        <div className="mb-8 component-detail-header">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link 
              href="/ui-components" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Components
            </Link>
            
            <span className="text-gray-400 dark:text-gray-600 px-1">/</span>
            
            <Link 
              href={`/ui-components/group/${componentGroup?.toLowerCase().replace(/\s+/g, '-')}/${component.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {component.name} Variants
            </Link>
            
            <span className="text-gray-400 dark:text-gray-600 px-1">/</span>
            
            <span className="text-blue-600 dark:text-blue-400">
              {selectedVariant}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  {component.name}
                </span>
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                {component.description}
              </p>
              {componentGroup && (
                <div className="mt-3 flex items-center space-x-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    <Layers className="h-3 w-3 mr-1" />
                    {componentGroup}
                  </div>
                  
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                    Variant: {selectedVariant}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleCopyCode}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors copy-button"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy code'}
              </button>
              
              <button 
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors copy-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-800 component-detail-tabs">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-medium text-sm tab-button ${
              activeTab === 'preview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Preview
          </button>
          
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 font-medium text-sm tab-button ${
              activeTab === 'code'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Code
          </button>
          
          {renderVariantSelector()}
        </div>
        
        {/* Component preview */}
        {activeTab === 'preview' ? (
          <div className="mb-12 component-detail-preview">
            <div className="p-6 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-center py-6">
                {renderComponentPreview()}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 component-detail-code">
            <div className="relative">
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-x-auto text-sm text-gray-800 dark:text-gray-300">
                <code>{getComponentCode(component, componentGroup)}</code>
              </pre>
              
              <div className="absolute top-2 right-2">
                <button 
                  onClick={handleCopyCode}
                  className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Usage section */}
        <div className="mt-10 component-detail-usage">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <div className="bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To use this {selectedVariant} {component.name.toLowerCase()} component in your project, follow these steps:
            </p>
            
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Download the component file</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click the download button above to save the component file to your computer.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Add the file to your project</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Place the downloaded file in your project's components directory.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
                    {`my-project/
└── components/
    └── ${component.name.toLowerCase().replace(/\s+/g, '-')}.tsx`}
                  </div>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Ensure Tailwind CSS is set up</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    This component uses Tailwind CSS classes. Make sure you have Tailwind CSS installed in your project.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
                    {`# Installation with npm
npm install -D tailwindcss
npx tailwindcss init`}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 mb-2">
                    Configure your tailwind.config.js to include the component files:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
{`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... other configuration
}`}
                  </div>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Import and use the {selectedVariant} component</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Import the component in your pages or other components.
                  </p>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-300">
{`import { ${component.name.replace(/\s+/g, '')} } from '../components/${component.name.toLowerCase().replace(/\s+/g, '-')}';

// Then in your component:
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <${component.name.replace(/\s+/g, '')} 
${componentGroup?.includes('Basic') ? '        variant="primary"\n' : ''}${componentGroup?.includes('Layout') ? '        header="My Card"\n        description="A simple card example"\n        bordered\n        shadowed\n' : ''}${componentGroup?.includes('Navigation') ? '        brand="My App"\n        links={[\n          { href: "/", label: "Home", active: true },\n          { href: "/about", label: "About" },\n          { href: "/contact", label: "Contact" }\n        ]}\n' : ''}${componentGroup?.includes('Feedback') ? '        variant="info"\n        title="Note"\n        showIcon\n' : ''}      >
        ${componentGroup?.includes('Basic') ? 'Click Me' : componentGroup?.includes('Feedback') ? 'This is an important message.' : 'Content goes here'}
      </${component.name.replace(/\s+/g, '')}>
    </div>
  );
}`}
                  </code>
                </pre>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
                  5
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Customize as needed</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    The component is fully customizable. Feel free to modify the styles, props, or add additional functionality to match your project's requirements.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        
        {/* Props section */}
        <div className="mt-10 component-detail-props">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
          <div className="bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prop Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Default
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    className
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ""
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Additional CSS classes to apply
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    children
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Child components or elements
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    variant
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    "default" | "primary" | "secondary"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    "default"
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    The visual style to apply to the component
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Customization section */}
        <div className="mt-10 component-detail-customization">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Customization Tips</h2>
          <div className="bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Here are some tips for customizing this component for your specific needs:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Custom Styling:</span> You can extend the Tailwind classes by adding your own custom styles or overriding the existing ones.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Add New Props:</span> Extend the component by adding new props for additional functionality.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Theming:</span> The component is designed to work with both light and dark themes. Use 'dark:' prefixed classes to customize the dark mode appearance.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Composability:</span> These components are designed to work together. You can combine them to create more complex UI patterns.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Alert icon component for feedback components
function AlertIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
} 