import React, { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Component } from '../types';
import { getComponentCode } from './helpers/codeUtils';

interface ComponentActionsProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentActions({ component, componentGroup, selectedVariant }: ComponentActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (component) {
      const componentCode = getComponentCode(component, componentGroup, selectedVariant);
      
      navigator.clipboard.writeText(componentCode);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleDownload = () => {
    if (component) {
      const componentCode = getComponentCode(component, componentGroup, selectedVariant);
      
      const blob = new Blob([componentCode], { type: 'text/javascript' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${component.name.replace(/\s+/g, '')}.jsx`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
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
  );
} 