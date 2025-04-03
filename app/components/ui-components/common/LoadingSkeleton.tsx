import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
} 