/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: ["text-body-sm"],
  theme: {
    extend: {
      screens: {
        mb: { max: "850px" },
        // tbc: { min: "768px", max: "1023px" },
        // tbr: { min: "1024px", max: "1439px" },
        pc: { min: "1440px" },
      },
      colors: {
        // Main Green
        'green-50': '#EAF7ED',
        'green-100': '#BFE6C8',
        'green-200': '#A0D9AD',
        'green-300': '#75C887',
        'green-400': '#5ABD70',
        'green-500': '#31AD4C',
        'green-600': '#2D9D45',
        'green-700': '#237B36',
        'green-800': '#1B5F2A',
        'green-900': '#154B20',

        // Sub Red
        'red-50': '#FFECF7',
        'red-100': '#FFC4E7',
        'red-200': '#FFA8DB',
        'red-300': '#FFB0CA',
        'red-400': '#FF68C0',
        'red-500': '#FF42B0',
        'red-600': '#E83CA0',
        'red-700': '#B52F7D',
        'red-800': '#8C2461',
        'red-900': '#6B1C4A',

        // Gray Scale
        'gray-0': '#FFFFFF',
        'gray-50': '#F6F6F7',
        'gray-100': '#E2E4E7',
        'gray-200': '#D3D7DB',
        'gray-300': '#BFC4CB',
        'gray-400': '#B3B9C1',
        'gray-500': '#A0A7B1',
        'gray-600': '#9298A1',
        'gray-700': '#72777E',
        'gray-800': '#585C61',
        'gray-900': '#43464A',
        'gray-1000': '#2C2E31',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['1.75rem', { lineHeight: '150%', letterSpacing: '-0.02em' }], // 28px
        '3xl': ['1.5rem', { lineHeight: '150%', letterSpacing: '-0.02em' }],  // 24px
        '2xl': ['1.25rem', { lineHeight: '150%', letterSpacing: '-0.02em' }], // 20px
        'xl': ['1.125rem', { lineHeight: '150%', letterSpacing: '-0.02em' }], // 18px
        'md': ['1rem', { lineHeight: '150%', letterSpacing: '-0.01em' }],     // 16px
        'sm': ['0.875rem', { lineHeight: '150%', letterSpacing: '0em' }],     // 14px
        'xs': ['0.75rem', { lineHeight: '150%', letterSpacing: '0em' }],      // 12px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".font-default": {
          fontFamily: "Pretendard, sans-serif",
        },
      });
    }),
  ],
};
