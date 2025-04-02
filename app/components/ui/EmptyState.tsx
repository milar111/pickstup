import React from 'react';
import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center p-8 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-white/5 dark:border-white/10">
      <div className="text-gray-500 dark:text-gray-600 mb-4">
        <Search className="h-16 w-16 mx-auto" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">No components found</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        We couldn't find any components matching your search criteria.
      </p>
    </div>
  );
} 