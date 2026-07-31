/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eef4ff', 100: '#dbe7fe', 200: '#bfd6fe', 300: '#93bbfd',
          400: '#5f97fa', 500: '#3b76f6', 600: '#2554eb', 700: '#2046d6',
          800: '#1f3aac', 900: '#1e3488', 950: '#182156',
        },
        secondary: {
          50: '#f6f2ff', 100: '#ede4ff', 200: '#dccdff', 300: '#c2a5ff',
          400: '#a374fd', 500: '#8b47f7', 600: '#7c26ea', 700: '#6c18cd',
          800: '#5a17a6', 900: '#4a1685', 950: '#2f0a5c',
        },
        accent: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b',
        },
        success: '#059669',
        warning: '#f59e0b',
        danger: '#ef4444',
        surface: {
          light: '#f8fafc',
          dark: '#0b1120',
        },
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(30, 41, 59, 0.08)',
        card: '0 10px 40px -12px rgba(37, 84, 235, 0.18)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(124,38,234,0.18)',
      },
      backdropBlur: { xs: '2px' },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
      keyframes: {
        fadeIn: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(124,38,234,0.35)' }, '50%': { boxShadow: '0 0 0 8px rgba(124,38,234,0)' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-40px) scale(1.1)' }, '66%': { transform: 'translate(-20px,20px) scale(0.95)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        blob: 'blob 12s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
