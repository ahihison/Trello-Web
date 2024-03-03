import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },

  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        tailwindcss
      ]
    }
  },
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})

