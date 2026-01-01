import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'website/',
        'tests/',
        'scripts/',
        '*.config.*',
        // React components require browser environment (jsdom)
        // They are tested separately in browser integration tests
        'src/renderers/react/**',
        // Vue and Svelte renderers - excluded from build, not tested
        'src/renderers/vue/**',
        'src/renderers/svelte/**',
        // Browser-only theme injection functions (injectThemeStyles, removeThemeStyles)
        // These require document API and are excluded from Node.js coverage
        'src/themes/css-vars.ts',
      ],
      thresholds: {
        lines: 99,
        functions: 97,
        branches: 94,
        statements: 99,
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
