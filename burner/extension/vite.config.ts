import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "starknetburner",
      // the proper extensions will be added
      fileName: (format) => {
        return `index.${format.toString() === "es" ? "js" : "umd.js"}`;
      },
    },
  },
  plugins: [],
});
