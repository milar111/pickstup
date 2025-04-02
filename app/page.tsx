import Link from 'next/link';

export default function Home() {
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
        {[...Array(50)].map((_, i) => (
          <div
            key={i + 50}
            className="absolute rounded-full animate-wind text-gray-800 dark:text-white"
            style={{
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * -50}%`,
              width: '1px',
              height: '1px',
              background: 'currentColor',
              opacity: 0.4,
              animationDelay: `${Math.random() * -30}s`,
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/ui-components"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full overflow-hidden transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Browse Components
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/docs"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 text-center"
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
