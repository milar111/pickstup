import React from 'react';
import { NextPage } from 'next';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Utils</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This directory contains utility functions and helpers for the UI components.
        </p>
        
        <div className="mt-8 grid gap-6">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">icons.tsx</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Helper functions for working with icons in the UI components system.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">filtering.ts</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Functions for filtering, sorting, and processing component data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page; 