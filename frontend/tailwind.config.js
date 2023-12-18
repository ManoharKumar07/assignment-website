/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["night"],
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
