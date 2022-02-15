module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(350px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(350px, 1fr))',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar-hide')],
}