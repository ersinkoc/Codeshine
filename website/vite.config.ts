import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Use local codeshine build instead of npm package
      '@oxog/codeshine/react': resolve(__dirname, './lib/codeshine/esm/renderers/react/index.js'),
      '@oxog/codeshine/themes': resolve(__dirname, './lib/codeshine/esm/themes/index.js'),
      '@oxog/codeshine/languages': resolve(__dirname, './lib/codeshine/esm/languages/index.js'),
      '@oxog/codeshine': resolve(__dirname, './lib/codeshine/esm/index.js'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
