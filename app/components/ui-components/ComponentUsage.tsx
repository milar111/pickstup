import React from 'react';
import { Component } from '../types';

interface ComponentUsageProps {
  component: Component;
  componentGroup: string | null;
  selectedVariant: string;
}

export default function ComponentUsage({ component, componentGroup, selectedVariant }: ComponentUsageProps) {
  return (
    <div className="mt-10 component-detail-usage">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
      <div className="bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          To use this {selectedVariant} {component.name.toLowerCase()} component in your project, follow these steps:
        </p>
        
        <ol className="space-y-6">
          <li className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Download the component file</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Click the download button above to save the component file to your computer.
              </p>
            </div>
          </li>
          
          <li className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Add the file to your project</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Place the downloaded file in your project's components directory.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
                {`my-project/
└── components/
    └── ${component.name.toLowerCase().replace(/\s+/g, '-')}.tsx`}
              </div>
            </div>
          </li>
          
          <li className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Ensure Tailwind CSS is set up</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                This component uses Tailwind CSS classes. Make sure you have Tailwind CSS installed in your project.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
                {`# Installation with npm
npm install -D tailwindcss
npx tailwindcss init`}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-2">
                Configure your tailwind.config.js to include the component files:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-gray-300 font-mono mb-2">
{`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... other configuration
}`}
              </div>
            </div>
          </li>
          
          <li className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
              4
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Import and use the {selectedVariant} component</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Import the component in your pages or other components.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-300">
{`import { ${component.name.replace(/\s+/g, '')} } from '../components/${component.name.toLowerCase().replace(/\s+/g, '-')}';

// Then in your component:
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <${component.name.replace(/\s+/g, '')} 
${componentGroup?.includes('Basic') ? '        variant="primary"\n' : ''}${componentGroup?.includes('Layout') ? '        header="My Card"\n        description="A simple card example"\n        bordered\n        shadowed\n' : ''}${componentGroup?.includes('Navigation') ? '        brand="My App"\n        links={[\n          { href: "/", label: "Home", active: true },\n          { href: "/about", label: "About" },\n          { href: "/contact", label: "Contact" }\n        ]}\n' : ''}${componentGroup?.includes('Feedback') ? '        variant="info"\n        title="Note"\n        showIcon\n' : ''}      >
        ${componentGroup?.includes('Basic') ? 'Click Me' : componentGroup?.includes('Feedback') ? 'This is an important message.' : 'Content goes here'}
      </${component.name.replace(/\s+/g, '')}>
    </div>
  );
}`}
                </code>
              </pre>
            </div>
          </li>
          
          <li className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm mr-3">
              5
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Customize as needed</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                The component is fully customizable. Feel free to modify the styles, props, or add additional functionality to match your project's requirements.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
} 