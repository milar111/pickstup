import { Component } from '../types';
import { componentGroups } from '../data';

export const getComponentCode = (
  component: Component | null, 
  groupName: string | null, 
  selectedVariant: string
): string => {
  if (!component || !groupName) return '';
  
  const group = componentGroups.find(g => g.title === groupName);
  if (!group) return '';
  
  if (group.componentCode && group.componentCode[component.name]) {
    return group.componentCode[component.name](selectedVariant);
  }
  
  const variants = group.variants?.[component.name] || [];
  const variant = variants.find(v => v.id === selectedVariant);
  if (variant && variant.code) {
    return variant.code;
  }
  
  return `import React from 'react';

/**
 * ${component.name} Component - ${selectedVariant} variant
 * ${component.description}
 */
export function ${component.name.replace(/\s+/g, '')}({ 
  children,
  className = '',
  variant = '${selectedVariant}',
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children || '${component.name} Content'}
    </div>
  );
}`; 
} 