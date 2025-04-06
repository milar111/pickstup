import { Component } from '../../types';

const codeCache: Record<string, string> = {};

export function getComponentCode(
  component: Component,
  componentGroup: string | null,
  selectedVariant: string
): string {
  try {
    const componentGroups = require('../../../ui-components/data').componentGroups;
    
    let variantInfo = null;
    for (const group of componentGroups) {
      if (group.variants && group.variants[component.name]) {
        const variants = group.variants[component.name];
        const variant = variants.find((v: any) => v.id === selectedVariant);
        if (variant && variant.codePath) {
          variantInfo = variant;
          break;
        }
      }
    }

    if (variantInfo && variantInfo.codePath) {
      const pathParts = variantInfo.codePath.split('/');
      const componentName = pathParts[pathParts.length - 2];
      const variantName = pathParts[pathParts.length - 1];
      
      const cacheKey = `${componentName}:${variantName}`;
      if (codeCache[cacheKey]) {
        return codeCache[cacheKey];
      }
      
      fetchComponentCode(componentName, variantName);
      
      return `// Loading ${componentName} ${variantName} code...
// If this message persists, there might be an issue fetching the code.`;
    }
  } catch (error) {
    console.error('Error loading component code:', error);
  }

  return getFallbackComponentCode(component, componentGroup, selectedVariant);
}

async function fetchComponentCode(componentName: string, variantName: string) {
  try {
    const response = await fetch(`/api/component-variants?component=${componentName}&variant=${variantName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch component code: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.code) {
      const cacheKey = `${componentName}:${variantName}`;
      codeCache[cacheKey] = data.code;
      
      const event = new CustomEvent('component-code-loaded', { 
        detail: { componentName, variantName, code: data.code } 
      });
      window.dispatchEvent(event);
    }
  } catch (error) {
    console.error('Error fetching component code:', error);
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFallbackComponentCode(
  component: Component,
  componentGroup: string | null,
  selectedVariant: string
): string {
  return `import React from 'react';

/**
 * ${component.name} - ${component.description}
 * 
 * Variant: ${selectedVariant}
 * Group: ${componentGroup}
 */
export default function ${component.name.replace(/\s+/g, '')}({ 
  className = '',
  children,
  variant = '${selectedVariant}',
  ...props
}) {
  return (
    <div 
      className={\`${getClassesForComponent(component, componentGroup, selectedVariant)} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}
`;
}

function getClassesForComponent(
  component: Component,
  componentGroup: string | null,
  variant: string
): string {
  if (!component || !componentGroup) return '';
  
  if (componentGroup.includes('Basic')) {
    return variant === 'primary' 
      ? 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors'
      : variant === 'secondary'
      ? 'px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors'
      : variant === 'outline'
      ? 'px-4 py-2 bg-transparent border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors'
      : 'px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors';
  }
  
  return '';
} 