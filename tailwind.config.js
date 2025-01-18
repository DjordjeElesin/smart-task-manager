/** @type {import('tailwindcss').Config} */
import { colors } from "./src/style/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media',
  theme: {
    screens: { 'sm': '400px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px', '3xl': '2560px' },
    extend: {
      colors: colors,
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shine: 'shine 1s linear',
      },
    },
  },
  plugins: [],
};
