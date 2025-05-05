import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({

    test: {
        globals: true,         // now `test`, `expect`, etc. are true globals
        environment: 'jsdom',  // for React Testing Library
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}']
      },
  plugins: [react()],
  server: {
    proxy: {
      // any request that starts with /api will be forwarded to port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
