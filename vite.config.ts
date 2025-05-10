import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Include service worker in the build
        'service-worker': resolve(__dirname, 'public/service-worker.js'),
      },
    },
  },
  // Copy PWA assets to the dist folder
  publicDir: 'public',
})
