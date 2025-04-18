import React, { useState, useEffect } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Component } from '../types';
import { getComponentCode } from './helpers/codeUtils';
import { useRouter, useSearchParams } from 'next/navigation';

interface ComponentCodeProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

type CodeFormat = 'typescript' | 'jsx' | 'css';

export default function ComponentCode({ component, componentGroup, selectedVariant }: ComponentCodeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState('');
  const [codeFormat, setCodeFormat] = useState<CodeFormat>(() => {
    const format = searchParams.get('format');
    return (format === 'jsx' || format === 'css' || format === 'typescript') ? format : 'typescript';
  });

  useEffect(() => {
    setCode(getComponentCode(component, componentGroup, selectedVariant, codeFormat));
  }, [component, componentGroup, selectedVariant, codeFormat]);

  useEffect(() => {
    const handleCodeLoaded = (event: any) => {
      const { componentName, variantName, code: loadedCode, format } = event.detail;
      
      const pathParts = (component.name || '').split('/');
      const currentComponentName = pathParts[pathParts.length - 1];
      
      if (
        currentComponentName.toLowerCase() === componentName.toLowerCase() && 
        selectedVariant === variantName &&
        format === codeFormat
      ) {
        setCode(loadedCode);
      }
    };
    
    window.addEventListener('component-code-loaded', handleCodeLoaded);
    
    return () => {
      window.removeEventListener('component-code-loaded', handleCodeLoaded);
    };
  }, [component, selectedVariant, codeFormat]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const fileExtension = codeFormat === 'css' ? 'css' : codeFormat === 'jsx' ? 'jsx' : 'tsx';
    const fileName = `${component.name.toLowerCase().replace(/\s+/g, '-')}-${selectedVariant}.${fileExtension}`;
    
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFormatChange = (format: CodeFormat) => {
    setCodeFormat(format);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('format', format);
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-12 component-detail-code">
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => handleFormatChange('typescript')} 
          className={`px-3 py-1.5 rounded text-sm ${codeFormat === 'typescript' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
        >
          TypeScript
        </button>
        <button 
          onClick={() => handleFormatChange('jsx')} 
          className={`px-3 py-1.5 rounded text-sm ${codeFormat === 'jsx' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
        >
          JSX
        </button>
        <button 
          onClick={() => handleFormatChange('css')} 
          className={`px-3 py-1.5 rounded text-sm ${codeFormat === 'css' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
        >
          CSS
        </button>
      </div>
      
      <div className="relative">
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-x-auto text-sm text-gray-800 dark:text-gray-300">
          <code>{code}</code>
        </pre>
        
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={handleCopyCode}
            className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <button 
            onClick={handleDownloadCode}
            className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-colors"
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 