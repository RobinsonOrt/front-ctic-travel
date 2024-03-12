/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gray2: 'var(--color-gray)',
        green2: 'var(--color-green)',
        green3: 'var(--color-green-light)',
      },
    },
  },
  plugins: [],
};

