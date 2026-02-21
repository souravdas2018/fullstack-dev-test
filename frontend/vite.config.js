import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  // Register Vue plugin to handle Vue SFC files
  plugins: [vue()],

  // Configure path aliases for cleaner imports
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // '@' maps to './src' directory
    }
  },

  // Configuration for testing environment
  test: {
    environment: 'jsdom',  // Use jsdom to simulate browser environment in tests
    globals: true          // Enable global APIs like describe, it, expect in tests
  },

  // Dev server configuration
  server: {
    port: 3021,  // Set the dev server to run on port 3021 instead of default 5173

    // Proxy configuration to forward API calls to backend server
    proxy: {
      '/api': {
        target: 'http://localhost:3020',  // Backend API server URL
        changeOrigin: true                 // Modify origin header to target URL
      }
    }
  }
});
