import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api/counter": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (_path) => `/macros/s/AKfycbxzIzU8Qc7g8Gq8jgmGT0OC_UMJI33z9XCBngFcSx9AUOQazLCxycx5Nug9vMzkkGnABw/exec?key=p001_live_k9x2mz7q`,
        followRedirects: true,
      },
      "/api/prize": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (_path) => `/macros/s/AKfycbwGSfkaGZ5pktJE6WQlxGQQvOyFyi_KziCQFV6saj7Wt6Wgb1SyCOytTGS30m2UZKmw/exec?key=p001_prize_m8y3nz5w`,
        followRedirects: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
