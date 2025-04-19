import Link from 'next/link';

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
  { left: '192.69%', top: '-6.19%', delay: '-27.60s' },
  
  // 1px particles (extra 20)
  { left: '124.25%', top: '-12.66%', delay: '-15.38s' },
  { left: '72.19%', top: '-42.56%', delay: '-7.76s' },
  { left: '11.48%', top: '-35.31%', delay: '-19.42s' },
  { left: '62.35%', top: '-9.03%', delay: '-28.91s' },
  { left: '138.76%', top: '-31.95%', delay: '-5.04s' },
  { left: '30.22%', top: '-17.77%', delay: '-14.71s' },
  { left: '82.64%', top: '-5.86%', delay: '-22.18s' },
  { left: '188.27%', top: '-26.38%', delay: '-11.15s' },
  { left: '142.91%', top: '-40.74%', delay: '-2.89s' },
  { left: '51.37%', top: '-2.48%', delay: '-16.52s' },
  { left: '131.73%', top: '-19.83%', delay: '-8.24s' },
  { left: '8.94%', top: '-44.12%', delay: '-25.59s' },
  { left: '97.28%', top: '-8.36%', delay: '-13.21s' },
  { left: '75.51%', top: '-37.17%', delay: '-30.07s' },
  { left: '168.34%', top: '-23.52%', delay: '-7.32s' },
  { left: '22.81%', top: '-14.17%', delay: '-18.95s' },
  { left: '113.56%', top: '-32.04%', delay: '-26.43s' },
  { left: '45.19%', top: '-6.28%', delay: '-9.76s' },
  { left: '157.42%', top: '-39.65%', delay: '-21.63s' },
  { left: '67.85%', top: '-29.14%', delay: '-3.17s' }
];

export default function Home() {
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
        {particlePositions.slice(50, 70).map((pos, i) => (
          <div
            key={i + 50}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: pos.left,
              top: pos.top,
              width: '1px',
              height: '1px',
              background: 'currentColor',
              opacity: 0.4,
              animationDelay: pos.delay,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Modern UI
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400">
                  Components
                </span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              A collection of beautiful, accessible, and customizable components built with modern web standards.
            </p>
            <div className="space-x-4">
              <Link
                href="/ui-components"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Components
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Documentation
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-[600px] h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div className="absolute top-[10%] left-[10%] w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-300/60 to-purple-300/60 dark:from-blue-500/30 dark:to-purple-500/30 rounded-lg backdrop-blur-sm"></div>
                  
                  <div className="absolute top-[20%] right-[15%] w-36 sm:w-48 h-36 sm:h-48 bg-gradient-to-br from-pink-300/60 to-purple-300/60 dark:from-pink-500/30 dark:to-purple-500/30 rounded-lg backdrop-blur-sm"></div>
                  
                  <div className="absolute bottom-[15%] left-[20%] w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-br from-yellow-300/60 to-orange-300/60 dark:from-yellow-500/30 dark:to-orange-500/30 rounded-full backdrop-blur-sm"></div>
                  
                  <div className="absolute bottom-[25%] right-[25%] w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-green-300/60 to-emerald-300/60 dark:from-green-500/30 dark:to-emerald-500/30 rounded-full backdrop-blur-sm"></div>
                  
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[45px] sm:border-l-[60px] border-l-transparent border-t-[75px] sm:border-t-[100px] border-t-blue-300/60 dark:border-t-blue-500/30 border-r-[45px] sm:border-r-[60px] border-r-transparent backdrop-blur-sm"></div>
                  
                  <div className="absolute top-[15%] right-[35%] w-0 h-0 border-l-[25px] sm:border-l-[30px] border-l-transparent border-t-[40px] sm:border-t-[50px] border-t-pink-300/60 dark:border-t-pink-500/30 border-r-[25px] sm:border-r-[30px] border-r-transparent backdrop-blur-sm"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600/30 dark:via-white/10 to-transparent"></div>
                  <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-600/30 dark:via-white/10 to-transparent"></div>
                  
                  <div className="absolute top-[15%] right-[20%] w-8 sm:w-12 h-8 sm:h-12 bg-gray-600/30 dark:bg-white/20 rounded-full backdrop-blur-sm"></div>
                  <div className="absolute bottom-[20%] left-[15%] w-6 sm:w-10 h-6 sm:h-10 bg-gray-600/30 dark:bg-white/20 rounded-full backdrop-blur-sm"></div>
                  <div className="absolute top-[45%] left-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-gray-600/30 dark:bg-white/20 rounded-full backdrop-blur-sm"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div className="absolute top-[15%] right-[20%] w-36 sm:w-48 h-36 sm:h-48 bg-gradient-to-br from-pink-300/40 to-purple-300/40 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-[20%] left-[15%] w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="group relative p-6 sm:p-8 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Modern Design</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Clean and minimalist components that follow modern design principles.</p>
            </div>
          </div>

          <div className="group relative p-6 sm:p-8 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Customizable</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Easily customize components to match your brand and design system.</p>
            </div>
          </div>

          <div className="group relative p-6 sm:p-8 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Responsive</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Perfectly adapted for all screen sizes, from mobile to desktop.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
