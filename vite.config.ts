import MillionLint from '@million/lint';
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
var plugins = [react()];
plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});