import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        compact: true,
        chunkFileNames: "assets/[name]-[hash].js",
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          "react-state": [
            "react-hook-form",
            "@tanstack/react-query",
            "@reduxjs/toolkit",
          ],
          // "ui-vendors": [""],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@router": resolve(__dirname, "./src/router"),
      "@queries": resolve(__dirname, "./src/queries"),
      "@requests": resolve(__dirname, "./src/requests"),
      "@redux": resolve(__dirname, "./src/redux"),
    },
  },
});
