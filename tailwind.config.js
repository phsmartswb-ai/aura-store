/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD5',
          300: '#D5C5B5',
          400: '#BFA893',
          500: '#A48B74',
          600: '#8A715C',
          700: '#6C5846',
          800: '#4D3E32',
          900: '#2F261F',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FBEDE7',
          200: '#F5D3C5',
          300: '#EDB49E',
          400: '#DF8B6E',
          500: '#C86843',
          600: '#B04E2B',
          700: '#8C3D21',
        },
        charcoal: {
          900: '#141716',
          800: '#1F2421',
          700: '#2E3532',
          600: '#434C48',
          500: '#616E68',
        },
        olive: {
          700: '#344036',
          800: '#252F27',
          900: '#1A211B'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

