import React, { useState, useEffect } from 'react';
import { Component } from '../types';
import { componentGroups } from '../../ui-components/data';
import { getComponentPreviewHTML } from './helpers/fileLoader';

interface ComponentPreviewProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentPreview({ component, componentGroup, selectedVariant }: ComponentPreviewProps) {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    let isMounted = true;
    
    async function loadPreview() {
      setIsLoading(true);
      
      if (!component || !componentGroup) return;
      
      try {
        const group = componentGroups.find(g => g.title === componentGroup);
        if (!group || !group.variants || !group.variants[component.name]) return;
        
        const variants = group.variants[component.name];
        const variant = variants.find(v => v.id === selectedVariant);
        
        if (!variant || !variant.codePath) return;
        
        const pathParts = variant.codePath.split('/');
        const componentName = pathParts[pathParts.length - 2];
        const variantName = pathParts[pathParts.length - 1];
        
        const html = await getComponentPreviewHTML(componentName, variantName);
        
        if (isMounted) {
          setPreviewHtml(html);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load component preview:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    loadPreview();
    
    return () => {
      isMounted = false;
    };
  }, [component, componentGroup, selectedVariant]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10 animate-pulse">
        <div className="w-64 h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
      </div>
    );
  }
  
  if (previewHtml) {
    return (
      <div className="flex items-center justify-center p-10">
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-8">
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 max-w-md">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">{component.name} - {selectedVariant}</h3>
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