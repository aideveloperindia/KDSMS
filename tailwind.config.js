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
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1E40AF',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        background: '#F3F4F6',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
      },
    },
  },
  plugins: [],
} 