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
        'green-100': '#D1ECD3',
        'green-200': '#B0E0BC',
        'green-300': '#79CB97',
        'green-400': '#51AD76',
        'green-500': '#31A14C',
        'green-600': '#029146',
        'green-700': '#237B36',
        'green-800': '#1B5F2A',
        'green-900': '#154B20',

        // Sub Red
        'red-50': '#FFE9F7',
        'red-100': '#FFDCF4',
        'red-200': '#FFCAF0',
        'red-300': '#FFB6CA',
        'red-400': '#FF80C0',
        'red-500': '#FF42B0',
        'red-600': '#F63CA7',
        'red-700': '#BE2D79',
        'red-800': '#902C61',
        'red-900': '#6B3C5A',

        // Gray Scale
        'gray-0': '#FFFFFF',
        'gray-50': '#F9F9F9',
        'gray-100': '#EFEFEF',
        'gray-200': '#D7D7D7',
        'gray-300': '#B9B9B9',
        'gray-400': '#A4A4A4',
        'gray-500': '#8A8A8A',
        'gray-600': '#6D6D6D',
        'gray-700': '#4E4E4E',
        'gray-800': '#555555',
        'gray-900': '#1A1A1A',
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
