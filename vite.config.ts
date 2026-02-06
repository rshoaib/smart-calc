/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'html-encoding-sniffer': './src/test/mocks/html-encoding-sniffer.js',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    // deps: { optimizer: { ssr: { include: ['html-encoding-sniffer'] } } }, // Removed
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    css: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any)
