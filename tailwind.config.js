/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b14',
        panel: '#0c1220',
        primary: '#8b5cf6',
        secondary: '#38bdf8',
        accent: '#2dd4bf',
        muted: '#9aa6bb',
      },
      boxShadow: {
        glow: '0 0 40px rgba(139, 92, 246, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 12s ease-in-out infinite',
        drift: 'drift 18s linear infinite',
        pulseSlow: 'pulseSlow 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(10px, -18px, 0) rotate(5deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
        },
        pulseSlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(139, 92, 246, 0)', opacity: '0.8' },
          '50%': { boxShadow: '0 0 38px rgba(56, 189, 248, 0.35)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
