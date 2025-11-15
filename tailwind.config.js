/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        'bg': {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
      },
      backgroundColor: {
        'hover-overlay': 'var(--hover-overlay)',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.3s ease-out',
        'typing-bounce': 'typing 1s infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        typing: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(primary|white|red-500|hover-overlay)/,
      variants: ['hover'],
    },
    {
      pattern: /border-(primary|white|red-500)/,
      variants: ['hover'],
    },
    {
      pattern: /text-(primary|white|red-500)/,
      variants: ['hover'],
    },
    {
      pattern: /(bg|border|text)-(primary|white|red-500)\/[0-9]+/,
      variants: ['hover'],
    },
  ],
}