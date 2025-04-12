'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Component } from '../types';

import PageBackground from './common/PageBackground';
import LoadingSkeleton from './common/LoadingSkeleton';
import ComponentHeader from './ComponentHeader';
import ComponentTabs from './ComponentTabs';
import ComponentPreview from './ComponentPreview';
import ComponentCode from './ComponentCode';
import ComponentActions from './ComponentActions';
import ComponentProps from './ComponentProps';
import ComponentUsage from './ComponentUsage';
import ComponentCustomization from './ComponentCustomization';

interface ComponentDetailClientProps {
  initialComponent: Component | null;
  initialComponentGroup: string | null;
  slug: string;
}

export default function ComponentDetailClient({ 
  initialComponent, 
  initialComponentGroup,
  slug 
}: ComponentDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [component, setComponent] = useState<Component | null>(initialComponent);
  const [componentGroup, setComponentGroup] = useState<string | null>(initialComponentGroup);
  const [selectedVariant, setSelectedVariant] = useState<string>('default');
  
  useEffect(() => {
    if (component && componentGroup) {
      const variant = searchParams.get('variant');
      if (variant) {
        setSelectedVariant(variant);
      }
    } else {
      router.push('/ui-components');
    }
  }, [component, componentGroup, router, searchParams]);
  
  if (!component) {
    return <LoadingSkeleton />;
  }
  
  return (
    <PageBackground>
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
      
      <ComponentTabs 
        component={component} 
        componentGroup={componentGroup} 
        activeTab={activeTab} 
        selectedVariant={selectedVariant} 
        setActiveTab={setActiveTab} 
        setSelectedVariant={setSelectedVariant} 
      />
      
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
      
      <ComponentUsage 
        component={component} 
        componentGroup={componentGroup} 
        selectedVariant={selectedVariant}
      />
      
      <ComponentProps component={component} />
      
      <ComponentCustomization component={component} />
    </PageBackground>
  );
} 