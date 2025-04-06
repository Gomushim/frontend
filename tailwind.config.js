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
        red: {},
      },
      fontFamily: {
        //sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        // Title
        // "title-lg": ["25px", { lineHeight: "150%", fontWeight: "900" }], // Large (Bold)
        // Body
        // "body-lg": ["19px", { lineHeight: "150%", fontWeight: "400" }], // Large (Regular)
        // Label
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
