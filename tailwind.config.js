module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 1.5s',
        'float-more-delayed': 'float 6s ease-in-out infinite 3s',
        'float-even-more-delayed': 'float 6s ease-in-out infinite 4.5s',
        'progress': 'progress 2s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'wind': 'wind 30s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        progress: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '75%',
          },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 0.2 },
        },
        wind: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-100vw, 100vh)' },
        },
      },
    },
  },
  plugins: [],
}

