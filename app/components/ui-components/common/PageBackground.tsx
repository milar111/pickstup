import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
}

// Predefined positions for particles to avoid hydration errors
const particlePositions = [
  // 3px particles (20)
  { left: '49.59%', top: '-28.09%', delay: '-18.69s' },
  { left: '110.10%', top: '-37.42%', delay: '-3.65s' },
  { left: '87.74%', top: '-38.12%', delay: '-5.46s' },
  { left: '31.12%', top: '-33.34%', delay: '-11.38s' },
  { left: '190.84%', top: '-35.84%', delay: '-17.02s' },
  { left: '100.37%', top: '-3.25%', delay: '-8.36s' },
  { left: '178.96%', top: '-47.32%', delay: '-11.53s' },
  { left: '2.68%', top: '-18.33%', delay: '-29.20s' },
  { left: '103.82%', top: '-14.70%', delay: '-24.29s' },
  { left: '185.44%', top: '-35.88%', delay: '-24.05s' },
  { left: '143.82%', top: '-23.23%', delay: '-8.81s' },
  { left: '184.08%', top: '-15.76%', delay: '-27.81s' },
  { left: '16.37%', top: '-29.55%', delay: '-26.89s' },
  { left: '158.19%', top: '-28.28%', delay: '-25.00s' },
  { left: '164.75%', top: '-46.90%', delay: '-9.08s' },
  { left: '87.61%', top: '-47.81%', delay: '-18.63s' },
  { left: '120.43%', top: '-16.20%', delay: '-5.68s' },
  { left: '176.62%', top: '-42.16%', delay: '-19.00s' },
  { left: '103.73%', top: '-18.58%', delay: '-29.79s' },
  { left: '143.69%', top: '-25.17%', delay: '-9.83s' },
  
  // 2px particles (30)
  { left: '154.48%', top: '-8.90%', delay: '-24.97s' },
  { left: '179.67%', top: '-6.94%', delay: '-17.97s' },
  { left: '79.35%', top: '-13.57%', delay: '-20.63s' },
  { left: '48.26%', top: '-45.81%', delay: '-22.61s' },
  { left: '34.76%', top: '-45.07%', delay: '-27.92s' },
  { left: '163.25%', top: '-33.86%', delay: '-25.66s' },
  { left: '128.36%', top: '-9.75%', delay: '-29.69s' },
  { left: '177.68%', top: '-27.81%', delay: '-19.73s' },
  { left: '145.95%', top: '-1.18%', delay: '-18.61s' },
  { left: '23.16%', top: '-23.49%', delay: '-13.33s' },
  { left: '199.61%', top: '-30.92%', delay: '-11.49s' },
  { left: '91.82%', top: '-37.93%', delay: '-27.75s' },
  { left: '33.50%', top: '-7.36%', delay: '-0.43s' },
  { left: '125.41%', top: '-27.70%', delay: '-3.67s' },
  { left: '151.65%', top: '-21.20%', delay: '-23.27s' },
  { left: '69.40%', top: '-21.12%', delay: '-12.47s' },
  { left: '152.50%', top: '-21.60%', delay: '-2.20s' },
  { left: '134.44%', top: '-43.48%', delay: '-11.24s' },
  { left: '23.94%', top: '-24.66%', delay: '-27.71s' },
  { left: '128.61%', top: '-46.12%', delay: '-12.11s' },
  { left: '140.29%', top: '-46.01%', delay: '-12.28s' },
  { left: '80.81%', top: '-17.25%', delay: '-1.49s' },
  { left: '36.65%', top: '-40.31%', delay: '-9.80s' },
  { left: '103.42%', top: '-1.20%', delay: '-22.75s' },
  { left: '57.52%', top: '-16.22%', delay: '-17.57s' },
  { left: '94.97%', top: '-34.97%', delay: '-16.35s' },
  { left: '89.63%', top: '-0.64%', delay: '-16.12s' },
  { left: '156.50%', top: '-42.36%', delay: '-23.83s' },
  { left: '98.12%', top: '-26.44%', delay: '-4.89s' },
  { left: '192.69%', top: '-6.19%', delay: '-27.60s' }
];

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.25] dark:opacity-30 [filter:invert(0.2)] dark:[filter:invert(0.8)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.slice(0, 20).map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: pos.left,
              top: pos.top,
              width: '3px',
              height: '3px',
              background: 'currentColor',
              opacity: 0.6,
              animationDelay: pos.delay,
            }}
          ></div>
        ))}
        {particlePositions.slice(20, 50).map((pos, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: pos.left,
              top: pos.top,
              width: '2px',
              height: '2px',
              background: 'currentColor',
              opacity: 0.5,
              animationDelay: pos.delay,
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