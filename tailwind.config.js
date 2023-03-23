/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1280px",
    },
    colors: {
      transparent: "transparent",
      grey: "EFEFEF",
      black: "#000",
      white: "#fff",
      ghost: "#EEEEEE",
      ghostShade: "#747474",
      red: "#FFC1C1",

      extend: {},
    },
    plugins: [],
  },
};
