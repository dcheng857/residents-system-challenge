/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /bg-(red|green|yellow|gray|blue)-(.*)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
