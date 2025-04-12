import { Component } from '../../types';

type CodeFormat = 'typescript' | 'jsx' | 'css';

const codeCache: Record<string, string> = {};

export function getComponentCode(
  component: Component,
  componentGroup: string | null,
  selectedVariant: string,
  format: CodeFormat = 'typescript'
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
      
      const cacheKey = `${componentName}:${variantName}:${format}`;
      if (codeCache[cacheKey]) {
        return codeCache[cacheKey];
      }
      
      fetchComponentCode(componentName, variantName, format);
      
      return `// Loading ${componentName} ${variantName} ${format} code...
// If this message persists, there might be an issue fetching the code.`;
    }
  } catch (error) {
    console.error('Error loading component code:', error);
  }

  return getFallbackComponentCode(component, componentGroup, selectedVariant, format);
}

async function fetchComponentCode(componentName: string, variantName: string, format: CodeFormat = 'typescript') {
  try {
    const response = await fetch(`/api/component-variants?component=${componentName}&variant=${variantName}&format=${format}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch component code: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.code) {
      const cacheKey = `${componentName}:${variantName}:${format}`;
      codeCache[cacheKey] = data.code;
      
      const event = new CustomEvent('component-code-loaded', { 
        detail: { componentName, variantName, code: data.code, format } 
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
  selectedVariant: string,
  format: CodeFormat = 'typescript'
): string {
  switch (format) {
    case 'typescript':
      return `import React from 'react';

/**
 * ${component.name} - ${component.description}
 * 
 * Variant: ${selectedVariant}
 * Group: ${componentGroup}
 */
interface ${component.name.replace(/\s+/g, '')}Props {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function ${component.name.replace(/\s+/g, '')}({ 
  className = '',
  children,
  ...props
}: ${component.name.replace(/\s+/g, '')}Props) {
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

    case 'jsx':
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

    case 'css':
      return `.${getHTMLClassesForComponent(component, componentGroup, selectedVariant).split(' ')[0]} {
  ${getCSSForComponent(component, componentGroup, selectedVariant)}
}`;

    default:
      return `// Unsupported format: ${format}`;
  }
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

function getHTMLClassesForComponent(
  component: Component,
  componentGroup: string | null,
  variant: string
): string {
  const name = component.name.toLowerCase().replace(/\s+/g, '-');
  
  if (componentGroup?.includes('Basic')) {
    if (component.name === 'Button') {
      return `${name}-${variant}`;
    } else if (component.name === 'Input') {
      return `${name}-${variant}`;
    }
  }
  
  return `${name}-component`;
}

function getCSSForComponent(
  component: Component,
  componentGroup: string | null,
  variant: string
): string {
  if (!component || !componentGroup) return '';
  
  if (componentGroup.includes('Basic')) {
    if (component.name === 'Button' && variant === 'primary') {
      return `padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  background-color: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
}

.button-primary:hover {
  background-color: #1d4ed8;
}

.button-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;`;
    } else if (component.name === 'Button' && variant === 'secondary') {
      return `padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  background-color: #e5e7eb;
  color: #1f2937;
  border: none;
  cursor: pointer;
}

.button-secondary:hover {
  background-color: #d1d5db;
}

.button-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;`;
    } else if (component.name === 'Button' && variant === 'outline') {
      return `padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  background-color: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
  cursor: pointer;
}

.button-outline:hover {
  background-color: #eff6ff;
}

.button-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;`;
    }
  }
  
  return `/* Default styles for ${component.name} ${variant} */`;
}