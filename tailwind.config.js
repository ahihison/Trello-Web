/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        homeHeader: '60px'
      },
      transitionMobileMenu: {
        'height': '0.3s linear 0.1s',
        'box-shadow': '0.1s linear 0s',
        'background-color': '0.1s linear 0s'
      }
    }
  },
  plugins: []
}

