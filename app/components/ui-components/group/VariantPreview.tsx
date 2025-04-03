import React from 'react';
import { Component } from '../../types';
import { componentGroups } from '../../../ui-components/data';

interface VariantPreviewProps {
  variant: any;
  componentData: Component;
  groupData: any;
}

export default function VariantPreview({ variant, componentData, groupData }: VariantPreviewProps) {
  if (!groupData || !componentData) return null;
  
  const group = componentGroups.find(g => g.title === groupData.title);
  if (!group) return null;

  if (group.renderPreview && 
      group.renderPreview[componentData.name] && 
      group.renderPreview[componentData.name][variant.id]) {
    return group.renderPreview[componentData.name][variant.id](variant);
  }
  
  if (groupData.title.includes('Basic')) {
    return (
      <button 
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          variant.id === 'primary' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : variant.id === 'secondary'
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            : variant.id === 'outline'
            ? 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
            : variant.id === 'disabled'
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
            : variant.id === 'icon'
            ? 'bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2'
            : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
        }`}
      >
        {variant.id === 'icon' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        )}
        {variant.name}
      </button>
    );
  } else if (groupData.title.includes('Layout')) {
    return (
      <div className={`w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
        variant.id === 'shadowed' ? 'shadow-md' : ''
      } ${
        variant.id === 'bordered' || variant.id === 'standard' ? 'border border-gray-200 dark:border-gray-700' : ''
      }`}>
        {(variant.id === 'header' || variant.id === 'with-header') && (
          <div className="border-b border-gray-200 dark:border-gray-700 p-3">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        )}
        <div className="p-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        {(variant.id === 'footer' || variant.id === 'with-footer') && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-end">
            <div className="h-6 w-16 bg-blue-500 rounded"></div>
          </div>
        )}
      </div>
    );
  } else if (groupData.title.includes('Navigation')) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-3 py-2 flex items-center">
          <div className="h-6 w-6 bg-blue-500 rounded"></div>
          <div className={`ml-4 flex gap-2 ${variant.id === 'centered' ? 'mx-auto' : ''}`}>
            <div className="h-4 w-12 bg-blue-100 dark:bg-blue-900 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          {variant.id === 'with-dropdown' && (
            <div className="ml-auto">
              <div className="h-4 w-4 border-t-2 border-l-2 border-gray-600 dark:border-gray-400 transform rotate-45 translate-y-0.5"></div>
            </div>
          )}
          {variant.id === 'responsive' && (
            <div className="ml-auto">
              <div className="flex flex-col gap-1">
                <div className="h-0.5 w-5 bg-gray-600 dark:bg-gray-400 rounded"></div>
                <div className="h-0.5 w-5 bg-gray-600 dark:bg-gray-400 rounded"></div>
                <div className="h-0.5 w-5 bg-gray-600 dark:bg-gray-400 rounded"></div>
              </div>
            </div>
          )}
        </div>
        {variant.id === 'with-dropdown' && (
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        )}
      </div>
    );
  } else if (groupData.title.includes('Feedback')) {
    const colors = {
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300',
      success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300',
      warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300',
      error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300',
      'with-action': 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300'
    };
    
    return (
      <div className={`w-full rounded-lg border p-3 flex ${colors[variant.id as keyof typeof colors]}`}>
        <div className="flex-shrink-0 mr-2">
          <div className="h-4 w-4 rounded-full border-2 border-current"></div>
        </div>
        <div>
          <div className="h-4 w-16 bg-current opacity-70 rounded mb-1"></div>
          <div className="h-3 w-28 bg-current opacity-40 rounded"></div>
          {variant.id === 'with-action' && (
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-12 rounded bg-current opacity-70"></div>
              <div className="h-5 w-12 rounded border border-current"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
} 