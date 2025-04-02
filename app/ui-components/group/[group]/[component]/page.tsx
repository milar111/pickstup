'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Layers } from 'lucide-react';
import { componentGroups } from '../../../data';

export default function ComponentGroupPage() {
  const params = useParams();
  const router = useRouter();
  const group = decodeURIComponent(params.group as string);
  const componentName = decodeURIComponent(params.component as string);
  
  const [groupData, setGroupData] = useState<any>(null);
  const [componentData, setComponentData] = useState<any>(null);
  
  useEffect(() => {
    // Find the matching group and component
    const formattedGroup = group.replace(/-/g, ' ');
    const matchedGroup = componentGroups.find(g => 
      g.title.toLowerCase() === formattedGroup
    );
    
    if (matchedGroup) {
      setGroupData(matchedGroup);
      
      const formattedComponent = componentName.replace(/-/g, ' ');
      const matchedComponent = matchedGroup.components.find(c => 
        c.name.toLowerCase() === formattedComponent
      );
      
      if (matchedComponent) {
        setComponentData(matchedComponent);
      } else {
        // If component not found, redirect back to components page
        router.push('/ui-components');
      }
    } else {
      // If group not found, redirect back to components page
      router.push('/ui-components');
    }
  }, [group, componentName, router]);

  // Get variants based on component type
  const getComponentVariants = () => {
    if (!groupData || !componentData) return [];
    
    // Find the component group in componentGroups
    const group = componentGroups.find(g => g.title === groupData.title);
    if (!group || !group.variants) return [];
    
    // Find the variants for this component
    return group.variants[componentData.name] || [];
  };

  // Render component variant
  const renderVariantPreview = (variant: any) => {
    if (!groupData || !componentData) return null;
    
    // Find the component group in componentGroups
    const group = componentGroups.find(g => g.title === groupData.title);
    if (!group) return null;

    // Use the group.renderPreview if available
    if (group.renderPreview && 
        group.renderPreview[componentData.name] && 
        group.renderPreview[componentData.name][variant.id]) {
      return group.renderPreview[componentData.name][variant.id](variant);
    }
    
    // Default preview implementations based on group type
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
  };

  // Get color based on category
  const getCategoryColor = () => {
    if (!groupData) return '';
    
    const group = componentGroups.find(g => g.title === groupData.title);
    const color = group?.color || 'gray';
    
    return `bg-${color}-100 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`;
  };

  if (!groupData || !componentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.25] dark:opacity-30 [filter:invert(0.2)] dark:[filter:invert(0.8)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '3px',
              height: '3px',
              background: 'currentColor',
              opacity: 0.6,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '2px',
              height: '2px',
              background: 'currentColor',
              opacity: 0.5,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Breadcrumb navigation */}
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
                {groupData.title}
              </div>
            </div>
          </div>
        </div>
        
        {/* Variants grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getComponentVariants().map(variant => (
            <Link
              key={variant.id}
              href={`/ui-components/${componentData.name.toLowerCase().replace(/\s+/g, '-')}?variant=${variant.id}`}
              className="group relative p-6 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="p-4 h-32 flex items-center justify-center">
                  {renderVariantPreview(variant)}
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 