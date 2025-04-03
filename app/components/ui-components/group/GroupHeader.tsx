import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { Component } from '../../types';

interface GroupHeaderProps {
  componentData: Component;
  groupTitle: string;
}

export default function GroupHeader({ componentData, groupTitle }: GroupHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-sm mb-4">
        <Link 
          href="/ui-components" 
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to components
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              {componentData.name} Variants
            </span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
            {componentData.description}
          </p>
          
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <Layers className="h-3 w-3 mr-1" />
            {groupTitle}
          </div>
        </div>
      </div>
    </div>
  );
} 