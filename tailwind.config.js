/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1280px",
    },
    colors: {
      transparent: "transparent",
      smoke: "#EFEFEF",
      black: "#000",
      orange: "#FC9B42",
      lightOrange: "#FFBA7A",
      lightGrey: "#D3D3D3",
      white: "#fff",
      ghost: "#bbbbbb",
      ghostShade: "#747474",
      red: "#FFC1C1",
    },
    fontFamily: {
      verdana: ["Verdana", "Roboto", "sans-serif"],
    },
    extend: {
      display: ["group-hover"]
    },
  },
  plugins: [],
};
