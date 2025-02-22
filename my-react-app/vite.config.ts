import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures proper asset loading
  server: {
    port: 5173, // Local development port
  },
  build: {
    outDir: 'dist',
  },
});
