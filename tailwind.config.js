const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["CircularXX", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        title: ["40px", "49px"],
        heading: ["28px", "34px"],
        subheading: ["20px", "25px"],
        paragraph: ["16px", "20px"],
        footnote: ["12px", "15px"],
      },
      colors: {
        now: {
          grey: "#94959A",
          grey40: "#a6a6a6",
          darkest: "#313439",
          dark: "#4C4F56",
          purple: "#696EE3",
          purpledark: "#707192",
          orangelight: "#FFEFD0",
          darkorange: "#937F53",
          orangepastel: "#FED88A",
          orange: "#FFA437",
          green: "#4FC464",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
