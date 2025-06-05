/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#00ff41',
          dark: '#008f11',
        },
        cyber: {
          dark: '#0a0a0a',
          darker: '#050505',
          terminal: '#0d1117',
          border: '#00ff4140',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
        },
        text: {
          green: '#00ff41',
          gray: '#8b949e',
          white: '#f0f6fc',
        },
        status: {
          danger: '#ff4757',
          warning: '#ffa502',
          info: '#3742fa',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        orbitron: ['Orbitron', 'monospace'],
      },
      animation: {
        glitch: 'glitch 4s linear infinite',
        blink: 'blink 1s infinite',
        scanLine: 'scanLine 3s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 98%': {
            textShadow: '0 0 20px #00ff41',
            transform: 'translate(0)',
          },
          '99%': {
            textShadow: '2px 0 #ff4757, -2px 0 #3742fa',
            transform: 'translate(2px, 0)',
          },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scanLine: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
    },
  },
  plugins: [],
}
