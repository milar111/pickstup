import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Component } from '../../types';
import VariantPreview from './VariantPreview';

interface VariantCardProps {
  variant: any;
  componentData: Component;
  groupData: any;
}

export default function VariantCard({ variant, componentData, groupData }: VariantCardProps) {
  const href = `/ui-components/${componentData.name.toLowerCase().replace(/\s+/g, '-')}?variant=${variant.id}`;
  
  const handlePreviewClick = (e: React.MouseEvent) => {
    // Prevent the link from navigating when clicking on the preview area
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <div className="group relative p-6 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        {/* Preview section - not clickable for navigation */}
        <div 
          className="p-4 h-40 flex items-center justify-center bg-white dark:bg-gray-900/50 rounded-lg overflow-hidden"
          onClick={handlePreviewClick}
        >
          <VariantPreview 
            variant={variant} 
            componentData={componentData} 
            groupData={groupData} 
          />
        </div>
        
        {/* Card info section - clickable for navigation */}
        <Link href={href}>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{variant.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{variant.description}</p>
              </div>
              <div className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 