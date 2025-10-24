import type { Config } from 'tailwindcss'

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0c10',
        text: '#e6e6e6',
        primary: '#7c3aed',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '\'Segoe UI\'',
          'Roboto',
          'Inter',
          'sans-serif',
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          lg: '2rem',
        },
      },
      boxShadow: {
        soft: '0 12px 32px rgba(12, 10, 25, 0.45)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseOutline: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out both',
        pulseOutline: 'pulseOutline 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
