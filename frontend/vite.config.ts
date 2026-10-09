import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development the SPA is served by Vite at / and proxies API/storage to Laravel.
// Production build is emitted into the Laravel public folder and served at /app.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/app/' : '/',
  plugins: [react()],
  build: {
    outDir: '../backend/public/app',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/storage': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
}))
