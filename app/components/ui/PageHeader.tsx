import React from 'react';

interface PageHeaderProps {
  title: string;
  totalVariants: number;
  totalComponents: number;
  children?: React.ReactNode;
}

export function PageHeader({ title, totalVariants, totalComponents, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div className="w-full md:w-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            {title}
          </span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Showing {totalVariants} variants from {totalComponents} components
        </p>
      </div>
      
      {children}
    </div>
  );
} 