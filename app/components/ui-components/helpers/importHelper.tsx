import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Helper function to dynamically import components from variant paths
 * This centralizes the logic for importing components and handles error states
 */
export function importComponent(path: string) {
  return dynamic(
    () => {
      const importPromise = 
        // Try direct import first
        import(`@/app/${path}`).catch(error => {
          console.warn(`Failed to import from @/app/${path}`, error);
          
          // Try without @/app prefix
          return import(`@/${path}`).catch(innerError => {
            console.warn(`Failed to import from @/${path}`, innerError);
            
            // Try relative import as last resort
            return import(`../../../${path}`).catch(finalError => {
              console.error(`All import strategies failed for ${path}`, finalError);
              throw new Error(`Could not load component from path: ${path}`);
            });
          });
        });
        
      return importPromise;
    },
    {
      loading: () => <div className="p-4 text-gray-400">Loading component...</div>,
      ssr: false,
    }
  );
} 