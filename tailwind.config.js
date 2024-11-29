/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: {
          DEFAULT: '#1a1a1a',
          secondary: '#2a2a2a',
          tertiary: '#3a3a3a',
        }
      },
      textColor: {
        dark: {
          DEFAULT: '#ffffff',
          secondary: '#a0a0a0',
        }
      },
      borderColor: {
        dark: {
          DEFAULT: '#3a3a3a',
          secondary: '#4a4a4a',
        }
      },
      gradientColorStops: {
        'primary': {
          start: '#8b5cf6',
          end: '#ec4899',
        },
        'secondary': {
          start: '#10b981',
          end: '#22d3ee',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}