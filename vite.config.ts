import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { resolve } from 'node:path'

const BACKEND_HOST = process.env.NODE_ENV !=  "production" ? "http://localhost:8080" : "" ;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: BACKEND_HOST,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
