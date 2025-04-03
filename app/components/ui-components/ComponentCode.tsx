import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Component } from '../types';
import { getComponentCode } from './helpers/codeUtils';

interface ComponentCodeProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentCode({ component, componentGroup, selectedVariant }: ComponentCodeProps) {
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

  return (
    <div className="mb-12 component-detail-code">
      <div className="relative">
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-x-auto text-sm text-gray-800 dark:text-gray-300">
          <code>{getComponentCode(component, componentGroup, selectedVariant)}</code>
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
  );
} 