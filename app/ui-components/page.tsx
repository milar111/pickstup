'use client';

import React, { useState } from 'react';
import { componentGroups } from './data';
import './styles.css';
import { getFilteredComponents, getTotalVariantCount } from './utils/filtering';
import { ComponentCard } from '../components/ui/ComponentCard';
import { SearchFilter } from '../components/ui/SearchFilter';
import { PageHeader } from '../components/ui/PageHeader';
import { PageBackground } from '../components/ui/PageBackground';
import { EmptyState } from '../components/ui/EmptyState';
import { GroupHeader } from '../components/ui/GroupHeader';

export default function UIComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredComponents = getFilteredComponents(searchQuery, selectedCategory);
  
  const selectedGroup = selectedCategory !== 'All' 
    ? componentGroups.find(g => g.title === selectedCategory) 
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <PageBackground />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
        <div className="space-y-6">
          <div className="mb-8">
            <PageHeader 
              title="UI Components" 
              totalVariants={getTotalVariantCount(filteredComponents)} 
              totalComponents={filteredComponents.length}
            >
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </PageHeader>
          </div>

          {selectedGroup && (
            <GroupHeader 
              group={selectedGroup} 
              componentsCount={filteredComponents.length} 
              variantsCount={getTotalVariantCount(filteredComponents)} 
            />
          )}

          {filteredComponents.length === 0 && <EmptyState />}

          {filteredComponents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map(component => (
                <ComponentCard key={`${component.groupTitle}-${component.name}`} component={component} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
