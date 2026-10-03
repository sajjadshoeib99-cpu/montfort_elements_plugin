import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // The preview is served through a proxy on an environment-specific host,
    // so every host must be accepted.
    allowedHosts: true,
    watch: {
      usePolling: true,
      interval: 400,
    },
    fs: {
      strict: false,
    },
  },
});
