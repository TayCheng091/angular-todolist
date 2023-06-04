/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "-lg": {
          max: "1329px",
        },
        "-md": {
          max: "1023px",
        },
        "-sm": {
          max: "768px",
        },
      },
      colors: {
        "black-6": "#666666",
        "black-A": "#aaaaaa",
      },
    },
  },
  plugins: [],
};
