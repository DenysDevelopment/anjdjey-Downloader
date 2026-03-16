import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './src',
    include: ['**/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['application/**', 'infrastructure/**', 'utils/**'],
      exclude: ['__tests__/**', '**/*.d.ts'],
    },
    testTimeout: 30_000,
    hookTimeout: 10_000,
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
});
