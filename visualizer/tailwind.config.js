/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0f',
          light: '#12121a',
          lighter: '#1a1a2e',
        },
        border: {
          DEFAULT: '#2a2a3e',
          light: '#3a3a4e',
        },
        'text-primary': '#e8e8f0',
        'text-secondary': '#8888a0',
        'text-muted': '#555570',
        accent: {
          gold: '#f5c542',
          purple: '#a855f7',
          blue: '#3b82f6',
          green: '#22c55e',
          cyan: '#06b6d4',
          orange: '#f97316',
          rose: '#f43f5e',
        },
      },
    },
  },
  plugins: [],
};
