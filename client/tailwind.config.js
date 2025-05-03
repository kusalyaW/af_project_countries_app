/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Vite serves index.html from the project root
    './index.html',
    // all of your source files
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      // we’ll add a custom heading font next
    },
  },
  plugins: [],
};
