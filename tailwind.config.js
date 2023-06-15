/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        darkRightGradient:
          "linear-gradient(to left, rgb(15, 15, 15) 20%, rgba(33, 33, 33, 0) 80%)",
        darkLeftGradient:
          "linear-gradient(to right, rgb(15, 15, 15) 20%, rgba(33, 33, 33, 0) 80%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
