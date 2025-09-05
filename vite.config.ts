import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  // Load env file based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')

  const BACKEND_HOST =
    mode === 'production'
      ? env.VITE_BACKEND_HOST
      : 'http://localhost:8080'

  return {
    plugins: [viteReact(), tailwindcss()],
    server: {
      host: true,
      proxy: {
        '/api': {
          target: BACKEND_HOST,
          changeOrigin: true,
          secure: false,
          headers: {
            ...(BACKEND_HOST.includes("ngrok") && { "ngrok-skip-browser-warning": "true" }),
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
