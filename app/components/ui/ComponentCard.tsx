import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Component } from '../../ui-components/types';
import { getIconComponent } from '../../ui-components/utils/icons';
import { componentGroups } from '../../ui-components/data';
import { getComponentPreviewHTML } from '../../components/ui-components/helpers/fileLoader';

interface ComponentCardProps {
  component: Component & { 
    groupTitle: string; 
    groupIcon?: string; 
    groupColor: string;
  };
}

export function ComponentCard({ component }: ComponentCardProps) {
  const IconComponent = getIconComponent(component.groupIcon);
  const group = componentGroups.find(g => g.title === component.groupTitle);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Get the first variant for preview
  useEffect(() => {
    const loadPreview = async () => {
      try {
        // Find group and get first variant of the component
        const group = componentGroups.find(g => g.title === component.groupTitle);
        if (!group || !group.variants || !group.variants[component.name]) {
          setIsLoading(false);
          return;
        }
        
        const firstVariant = group.variants[component.name][0];
        if (!firstVariant) {
          setIsLoading(false);
          return;
        }
        
        // Get preview HTML
        const html = await getComponentPreviewHTML(component.name, firstVariant.id);
        setPreviewHtml(html);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading component preview:', error);
        setIsLoading(false);
      }
    };
    
    loadPreview();
  }, [component]);
  
  const handlePreviewClick = (e: React.MouseEvent) => {
    // Prevent the link from navigating when clicking on the preview area
    e.preventDefault();
    e.stopPropagation();
  };
  
  const href = `/ui-components/group/${component.groupTitle.toLowerCase().replace(/\s+/g, '-')}/${component.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="group relative p-6 bg-gray-50 dark:bg-white/5 rounded-xl border-2 border-gray-200 dark:border-white/10 hover:border-blue-200 dark:hover:border-white/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl opacity-100 dark:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        {/* Preview section - not clickable for navigation */}
        <div 
          className="component-preview h-36 mb-4 flex items-center justify-center bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 p-4 overflow-hidden"
          onClick={handlePreviewClick}
        >
          {isLoading ? (
            <div className="animate-pulse flex items-center justify-center w-full h-full">
              <div className="w-3/4 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : previewHtml ? (
            <div 
              className="w-full h-full flex items-center justify-center" 
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            renderComponentPreview(component)
          )}
        </div>
        
        {/* Card info section - clickable for navigation */}
        <Link href={href}>
          <div className="flex items-center justify-between cursor-pointer">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{component.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{component.description}</p>
              
              <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <IconComponent className="h-3 w-3 mr-1" />
                <span>{component.groupTitle}</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-gray-700 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function renderComponentPreview(component: Component & { groupTitle: string }) {
  const group = componentGroups.find(g => g.title === component.groupTitle);
  
  if (!group) return null;
  
  if (group.renderPreview && 
      group.renderPreview[component.name] && 
      Object.values(group.renderPreview[component.name])[0]) {
    const firstVariantKey = Object.keys(group.renderPreview[component.name])[0];
    return group.renderPreview[component.name][firstVariantKey]({ 
      id: firstVariantKey, 
      name: component.name, 
      description: component.description 
    });
  }
  
  if (component.groupTitle.includes('Basic')) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors">
            {component.name}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            Cancel
          </button>
        </div>
      </div>
    );
  } else if (component.groupTitle.includes('Layout')) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="p-4">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-3"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  } else if (component.groupTitle.includes('Navigation')) {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 flex items-center px-4 shadow-sm">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">N</div>
          <div className="ml-auto flex gap-3">
            <div className="h-6 px-2 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
              <div className="h-2 w-10 bg-blue-500 rounded-sm"></div>
            </div>
            <div className="h-6 px-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <div className="h-2 w-10 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (component.groupTitle.includes('Feedback')) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900 flex gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium">{component.name}</h3>
            <p className="text-xs mt-1">{component.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-4 border rounded-md">
        <div className="text-center">{component.name}</div>
      </div>
    </div>
  );
} 