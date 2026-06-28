import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy Sanctum CSRF cookie and API calls to Laravel so cookies are
      // set for localhost:5173 — required for Sanctum SPA cookie auth to work
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: false,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: false,
      },
    },
  },
})
