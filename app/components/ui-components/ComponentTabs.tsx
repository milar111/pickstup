import React from 'react';
import { Component } from '../types';
import { componentGroups } from '../../ui-components/data';

interface ComponentTabsProps {
  component: Component;
  componentGroup: string | null;
  activeTab: 'preview' | 'code';
  selectedVariant: string;
  setActiveTab: (tab: 'preview' | 'code') => void;
  setSelectedVariant: (variant: string) => void;
}

export default function ComponentTabs({ 
  component, 
  componentGroup, 
  activeTab, 
  selectedVariant, 
  setActiveTab, 
  setSelectedVariant 
}: ComponentTabsProps) {

  const getComponentVariants = () => {
    if (!component || !componentGroup) return [];
    
    const group = componentGroups.find(g => g.title === componentGroup);
    if (!group || !group.variants) return [];
    
    return group.variants[component.name] || [];
  };

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

  return (
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
  );
} 