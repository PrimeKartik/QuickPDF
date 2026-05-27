/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#000000",
          raised: "#0061ff"
        },
        text: {
          secondary: "#444444",
          tertiary: "#232323",
          inverse: "#ffffff"
        }
      },
      fontFamily: {
        body: ["DM Sans", "-apple-system", "blinkmacsystemfont", "Segoe UI", "roboto", "Helvetica Neue", "arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': ['14px', '21px'],
        'md': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '32px'
      },
      spacing: {
        '1': '2.56px',
        '2': '4px',
        '3': '8px',
        '4': '11.5px',
        '5': '12px',
        '6': '16px',
        '7': '18px',
        '8': '23px'
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '10.8px',
        'lg': '16px'
      },
      transitionDuration: {
        'instant': '150ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '400ms'
      }
    },
  },
  plugins: [],
}
