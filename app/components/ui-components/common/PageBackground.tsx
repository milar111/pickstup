import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.25] dark:opacity-30 [filter:invert(0.2)] dark:[filter:invert(0.8)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '3px',
              height: '3px',
              background: 'currentColor',
              opacity: 0.6,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '2px',
              height: '2px',
              background: 'currentColor',
              opacity: 0.5,
              animationDelay: `${Math.random() * -30}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {children}
      </div>
    </div>
  );
} 