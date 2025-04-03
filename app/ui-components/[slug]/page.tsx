'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { componentGroups } from '../data';
import { Component } from '../types';

// Import components from their new location
import PageBackground from '../../components/ui-components/common/PageBackground';
import LoadingSkeleton from '../../components/ui-components/common/LoadingSkeleton';
import ComponentHeader from '../../components/ui-components/ComponentHeader';
import ComponentTabs from '../../components/ui-components/ComponentTabs';
import ComponentPreview from '../../components/ui-components/ComponentPreview';
import ComponentCode from '../../components/ui-components/ComponentCode';
import ComponentActions from '../../components/ui-components/ComponentActions';
import ComponentProps from '../../components/ui-components/ComponentProps';
import ComponentUsage from '../../components/ui-components/ComponentUsage';
import ComponentCustomization from '../../components/ui-components/ComponentCustomization';

export default function ComponentDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [component, setComponent] = useState<Component | null>(null);
  const [componentGroup, setComponentGroup] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('default');
  
  useEffect(() => {
    // Find the component that matches the slug
    let foundComponent: Component | null = null;
    let foundGroup: string | null = null;
    
    componentGroups.forEach(group => {
      const match = group.components.find(comp => 
        comp.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (match) {
        foundComponent = match;
        foundGroup = group.title;
      }
    });
    
    if (foundComponent) {
      setComponent(foundComponent);
      setComponentGroup(foundGroup);
      
      // Get variant from URL if present
      const searchParams = new URLSearchParams(window.location.search);
      const variant = searchParams.get('variant');
      if (variant) {
        setSelectedVariant(variant);
      }
    } else {
      // If no component is found, redirect back to the components page
      router.push('/ui-components');
    }
  }, [slug, router]);
  
  if (!component) {
    return <LoadingSkeleton />;
  }
  
  return (
    <PageBackground>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ComponentHeader 
          component={component} 
          componentGroup={componentGroup} 
          selectedVariant={selectedVariant} 
        />
        <ComponentActions 
          component={component} 
          componentGroup={componentGroup} 
          selectedVariant={selectedVariant} 
        />
      </div>
      
      {/* Tabs */}
      <ComponentTabs 
        component={component} 
        componentGroup={componentGroup} 
        activeTab={activeTab} 
        selectedVariant={selectedVariant} 
        setActiveTab={setActiveTab} 
        setSelectedVariant={setSelectedVariant} 
      />
      
      {/* Content based on active tab */}
      {activeTab === 'preview' ? (
        <div className="mb-12 component-detail-preview">
          <div className="p-6 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-center py-6">
              <ComponentPreview 
                component={component} 
                componentGroup={componentGroup} 
                selectedVariant={selectedVariant}
              />
            </div>
          </div>
        </div>
      ) : (
        <ComponentCode 
          component={component} 
          componentGroup={componentGroup} 
          selectedVariant={selectedVariant}
        />
      )}
      
      {/* Usage section */}
      <ComponentUsage 
        component={component} 
        componentGroup={componentGroup} 
        selectedVariant={selectedVariant}
      />
      
      {/* Props section */}
      <ComponentProps component={component} />
      
      {/* Customization section */}
      <ComponentCustomization component={component} />
    </PageBackground>
  );
} 