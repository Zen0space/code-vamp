import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks configuration for better code splitting
        manualChunks: {
          // React and React ecosystem
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Disable source maps for production (smaller bundle)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable minification with esbuild (fastest)
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Build optimizations
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable asset inlining for small files
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    // Include dependencies that should be pre-bundled for faster dev server
    include: [
      'react',
      'react-dom',
    ],
    // Exclude large dependencies from pre-bundling if they're better as separate chunks
    exclude: []
  },
  // Development server optimizations
  server: {
    // Optimize for faster builds
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
    // Configure HMR for proxy environments
    hmr: {
      port: 5173,
      host: 'localhost',
      overlay: true,
      // Force HMR to use the same port as the dev server
      clientPort: 5173
    },
    // Enable file watching with polling for better compatibility
    watch: {
      usePolling: true,
      interval: 100
    },
    // Allow connections from any host (for proxy setups)
    host: true,
    // Set the port explicitly
    port: 5173,
    // Enable CORS for cross-origin requests
    cors: true
  },
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
})
