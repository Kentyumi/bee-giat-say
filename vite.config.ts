import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bee-giat-say/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
