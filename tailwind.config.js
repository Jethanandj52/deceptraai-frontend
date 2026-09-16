/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navy: '#050d1a',
        navy2: '#071225',
        navy3: '#0a1930',
        card: '#0d2040',
        blue2: '#2979ff',
        cyan: '#00d4ff',
        border: '#1a3a6b',
        muted: '#7a9cc0',
        purple: '#7c3aed',
        danger: '#f43f5e',
        success: '#10b981',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      keyframes: {
        scanDown: { '0%': { top: '-1px' }, '100%': { top: '100%' } },
        scanRight: { '0%': { left: '-1px' }, '100%': { left: '100%' } },
        floatTag: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-9px)' } },
        dotPulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.35, transform: 'scale(0.75)' },
        },
        livePulse: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        camScan: { '0%': { top: '0' }, '100%': { top: '100%' } },
        riseUp: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        authIn: {
          from: { opacity: 0, transform: 'translateY(12px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        ldot: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.5 },
          '40%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        'scan-down': 'scanDown 7s linear infinite',
        'scan-right': 'scanRight 9s linear infinite',
        'scan-right-slow': 'scanRight 11s linear infinite',
        'float-tag': 'floatTag 4s ease-in-out infinite alternate',
        'dot-pulse': 'dotPulse 1.5s infinite',
        'live-pulse': 'livePulse 1s infinite',
        'cam-scan': 'camScan 2.5s linear infinite',
        'rise-up': 'riseUp 0.5s ease both',
        'fade-up': 'fadeUp 0.6s ease both',
        'auth-in': 'authIn 0.25s ease both',
        ldot: 'ldot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
