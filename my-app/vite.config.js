import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct path resolution
  build: {
    outDir: "dist", // Vercel expects the build output in 'dist'
    emptyOutDir: true, // Clears previous builds
  },
  server: {
    port: 5173, // You can change this if needed
    open: true, // Opens browser on start
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Helps with clean imports
    },
  },
});
