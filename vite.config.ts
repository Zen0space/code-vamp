import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into their own chunks
          'react-vendor': ['react', 'react-dom'],
          'worldcoin-vendor': ['@worldcoin/minikit-js', '@worldcoin/idkit'],
          'crypto-vendor': ['crypto-js'],
          'database-vendor': ['@libsql/client'],
          // Group UI libraries
          'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-dialog'],
        },
      },
    },
  },
}) 