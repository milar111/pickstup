import React from 'react';

export function PageBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.15] dark:opacity-30 [filter:invert(0)] dark:[filter:invert(0.8)]"></div>

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
    </>
  );
} 