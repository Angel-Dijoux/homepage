import MillionLint from "@million/lint";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
var plugins = [react(), TanStackRouterVite()];
plugins.unshift(MillionLint.vite());
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
