import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "../package.json" with { type: "json" };
import { aprilUi } from "../src/vite.js";

const repoRoot = resolve(import.meta.dirname, "..");

export default defineConfig({
  root: import.meta.dirname,
  define: {
    __APRIL_VERSION__: JSON.stringify(packageJson.version),
  },
  plugins: [react(), aprilUi({ version: packageJson.version })],
  resolve: {
    alias: [
      { find: /^april-ui\/styles\.css$/, replacement: resolve(repoRoot, "src/styles/april.css") },
      { find: /^april-ui$/, replacement: resolve(repoRoot, "src/index.js") },
    ],
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
  server: {
    port: 5173,
    fs: { allow: [repoRoot] },
  },
});
