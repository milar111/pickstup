import { Component } from '../../types';

export function getComponentCode(
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
      ${getComponentContent(component, componentGroup, selectedVariant)}
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
      : variant === 'disabled'
      ? 'px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed opacity-60 font-medium transition-colors'
      : 'px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors';
  } else if (componentGroup.includes('Layout')) {
    return `w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
    ${variant === 'shadowed' ? 'shadow-md' : ''}
    ${variant === 'bordered' || variant === 'standard' ? 'border border-gray-200 dark:border-gray-700' : ''}`;
  } else if (componentGroup.includes('Feedback')) {
    const colors = {
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300',
      success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300',
      warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300',
      error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300',
      'with-action': 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300'
    };
    
    return `w-full rounded-lg border p-4 flex ${colors[variant as keyof typeof colors] || colors.info}`;
  }
  
  return '';
}

function getComponentContent(
  component: Component,
  componentGroup: string | null,
  variant: string
): string {
  if (!component || !componentGroup) return '';
  
  if (componentGroup.includes('Basic')) {
    return variant === 'icon' 
      ? `<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>`
      : '';
  } else if (componentGroup.includes('Layout')) {
    let content = '';
    
    if (variant === 'header' || variant === 'with-header') {
      content += `<div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{props.header || '${component.name}'}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{props.description || '${component.description}'}</p>
      </div>`;
    }
    
    content += `<div className="p-4">
      ${variant === 'empty' ? '' : '<p className="text-gray-600 dark:text-gray-300">Content area</p>'}
    </div>`;
    
    if (variant === 'footer' || variant === 'with-footer') {
      content += `<div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {props.actionText || 'Action'}
        </button>
      </div>`;
    }
    
    return content;
  } else if (componentGroup.includes('Feedback')) {
    let icon = '';
    
    if (variant === 'info' || variant === 'with-action') {
      icon = `<svg className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>`;
    } else if (variant === 'success') {
      icon = `<svg className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>`;
    } else if (variant === 'warning') {
      icon = `<svg className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>`;
    } else if (variant === 'error') {
      icon = `<svg className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>`;
    }
    
    let content = `<div className="flex">
      ${icon}
      <div>
        <h3 className="text-sm font-medium">{props.title || '${variant.charAt(0).toUpperCase() + variant.slice(1)}'}</h3>
        <p className="text-sm mt-1">{props.message || '${component.description}'}</p>`;
        
    if (variant === 'with-action') {
      content += `
        <div className="mt-3 flex gap-2">
          <button className="px-2 py-1 text-xs bg-current bg-opacity-10 text-current rounded">{props.primaryAction || 'Action'}</button>
          <button className="px-2 py-1 text-xs border border-current rounded">{props.secondaryAction || 'Dismiss'}</button>
        </div>`;
    }
    
    content += `
      </div>
    </div>`;
    
    return content;
  }
  
  return '';
} 