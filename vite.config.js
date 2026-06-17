import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Catch any requests starting with /api and forward them to Express
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
