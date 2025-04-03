import React from 'react';
import { Component } from '../types';
import { componentGroups } from '../../ui-components/data';

interface ComponentPreviewProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentPreview({ component, componentGroup, selectedVariant }: ComponentPreviewProps) {
  if (!component || !componentGroup) return null;
  
  const group = componentGroups.find(g => g.title === componentGroup);
  if (!group) return null;
  
  const variants = group.variants?.[component.name] || [];
  const variant = variants.find(v => v.id === selectedVariant) || { 
    id: selectedVariant, 
    name: selectedVariant, 
    description: '' 
  };
  
  if (group.renderPreview && 
      group.renderPreview[component.name] && 
      group.renderPreview[component.name][selectedVariant]) {
    return group.renderPreview[component.name][selectedVariant](variant);
  }
  
  if (variant.previewCode) {
    return <div dangerouslySetInnerHTML={{ __html: variant.previewCode }} />;
  }
  
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
            {selectedVariant === 'info' && <AlertIcon className="h-5 w-5" />}
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
            {selectedVariant === 'with-action' && <AlertIcon className="h-5 w-5" />}
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
  
  return (
    <div className="flex items-center justify-center p-8">
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 max-w-md">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">{component.name} - {variant.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{component.description}</p>
      </div>
    </div>
  );
}

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