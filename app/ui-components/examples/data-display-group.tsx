import React from 'react';
import { ComponentGroup, ComponentVariant } from '../types';

/**
 * Example of adding a new Data Display component group 
 * This file shows how to define a complete component group with all features
 */
export const dataDisplayGroup: ComponentGroup = {
  title: 'Data Display Components',
  description: 'Components for displaying and visualizing data',
  icon: 'Database',
  color: 'indigo',
  components: [
    { name: 'Table', description: 'For displaying tabular data' },
    { name: 'Chart', description: 'Visual data representation' },
    { name: 'Badge', description: 'Small status indicator' },
    { name: 'Statistic', description: 'Highlight important numbers' },
  ],
  variants: {
    'Table': [
      { id: 'basic', name: 'Basic', description: 'Simple table layout' },
      { id: 'bordered', name: 'Bordered', description: 'Table with borders' },
      { id: 'striped', name: 'Striped', description: 'Table with alternating row colors' },
      { id: 'compact', name: 'Compact', description: 'Table with smaller padding' },
      { id: 'with-pagination', name: 'With Pagination', description: 'Table with pagination controls' },
    ],
    'Chart': [
      { id: 'bar', name: 'Bar Chart', description: 'Vertical bar chart' },
      { id: 'line', name: 'Line Chart', description: 'Line graph for trends' },
      { id: 'pie', name: 'Pie Chart', description: 'For percentage visualization' },
      { id: 'donut', name: 'Donut Chart', description: 'Circular visualization with center' },
    ],
    'Badge': [
      { id: 'default', name: 'Default', description: 'Standard badge' },
      { id: 'status', name: 'Status', description: 'Status indicator badge' },
      { id: 'counter', name: 'Counter', description: 'Numeric badge for counts' },
      { id: 'dot', name: 'Dot', description: 'Minimal dot indicator' },
    ],
    'Statistic': [
      { id: 'simple', name: 'Simple', description: 'Basic number with label' },
      { id: 'with-icon', name: 'With Icon', description: 'Statistic with icon' },
      { id: 'with-change', name: 'With Change', description: 'Shows change over time' },
      { id: 'card', name: 'Card', description: 'Statistic in a card layout' },
    ]
  },
  
  
  renderPreview: {
    'Table': {
      'basic': (variant: ComponentVariant) => (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Jane Cooper</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Regional Paradigm Tech</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Cody Fisher</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Product Directives Officer</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">Inactive</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      
    },
    'Badge': {
      'default': (variant: ComponentVariant) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Badge
        </span>
      ),
      'status': (variant: ComponentVariant) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <div className="w-2 h-2 mr-1.5 rounded-full bg-green-500"></div>
          Available
        </span>
      ),
      
    }
    
  },
  
  
  componentCode: {
    'Table': (variant: string) => {
      let componentCode = `import React from 'react';

/**
 * Table Component - ${variant} variant
 * For displaying tabular data
 */
export function Table({
  data = [],
  columns = [],
  className = '',
  variant = "${variant}",
  ...props
}) {
  return (
    <div className={\`overflow-x-auto \${className}\`} {...props}>
      <table className={\`min-w-full divide-y divide-gray-200 dark:divide-gray-700 \${
        variant === 'bordered' ? 'border border-gray-200 dark:border-gray-700' : ''
      }\`}>
        <thead className={\`bg-gray-50 dark:bg-gray-900 \${variant === 'compact' ? 'text-xs' : 'text-sm'}\`}>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                scope="col" 
                className={\`\${variant === 'compact' ? 'px-3 py-2' : 'px-6 py-3'} text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider\`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={\`\${
                variant === 'striped' && rowIndex % 2 === 1 
                  ? 'bg-gray-50 dark:bg-gray-900/50' 
                  : ''
              }\`}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className={\`\${variant === 'compact' ? 'px-3 py-2' : 'px-6 py-4'} whitespace-nowrap text-sm \${
                    colIndex === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }\`}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      ${variant === 'with-pagination' ? `
      <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http:
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http:
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>` : ''}
    </div>
  );
}

type Column = {
  header: string;
  accessor: string;
};

type TableProps = {
  data: Record<string, any>[];
  columns: Column[];
  className?: string;
  variant?: 'basic' | 'bordered' | 'striped' | 'compact' | 'with-pagination';
} & React.HTMLAttributes<HTMLDivElement>;`;
      
      return componentCode;
    },
    
    
  },
  
  
  props: {
    'Table': {
      'basic': [
        { type: 'Record<string, any>[]', default: '[]', description: 'Array of data objects to display in the table' },
        { type: 'Column[]', default: '[]', description: 'Array of column definitions (header and accessor)' },
        { type: 'string', default: "''", description: 'Additional CSS classes to apply' },
        { type: 'string', default: "'basic'", description: 'Table variant (basic, bordered, striped, etc.)' }
      ],
      
    },
    'Badge': {
      'default': [
        { type: 'ReactNode', default: 'undefined', description: 'Badge content' },
        { type: 'string', default: "''", description: 'Additional CSS classes to apply' },
        { type: 'string', default: "'default'", description: 'Badge variant (default, status, counter, etc.)' }
      ],
      
    }
    
  }
};

/**
 * To use this new component group, import it in app/ui-components/data.ts 
 * and add it to the componentGroups array:
 * 
 * import { dataDisplayGroup } from './examples/data-display-group';
 * 
 * export const componentGroups = [
 *   
 *   dataDisplayGroup,
 * ];
 */ 
