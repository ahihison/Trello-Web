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
      transitionProperty: {
        'height': '600px',
        'shadow': 'box-shadow',
        'bg': 'background-color'
      },
      transitionDuration: {
        '300': '0.3s',
        '100': '0.1s'
      },
      transitionTimingFunction: {
        'linear': 'linear'
      },
      transitionDelay: {
        '100': '0.1s',
        '0': '0s'
      }
    }
  },
  plugins: []
}

