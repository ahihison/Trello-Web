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
      backgroundImage: theme => ({
        'wave': 'url(\'https://images.ctfassets.net/rz1oowkt5gyp/7lTGeXbBRNRLaVk2MdBjtJ/99c266ed4cb8cc63bd0c388071f01ff6/white-wave-bg.svg\')'
      }),
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

