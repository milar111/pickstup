import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { Component } from '../types';

interface ComponentHeaderProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentHeader({ component, componentGroup, selectedVariant }: ComponentHeaderProps) {
  return (
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
      </div>
    </div>
  );
} 