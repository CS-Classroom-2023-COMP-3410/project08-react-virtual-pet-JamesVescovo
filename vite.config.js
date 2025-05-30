import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    strictPort: true,
    open: true // Automatically open browser
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})