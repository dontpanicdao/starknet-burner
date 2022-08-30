import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "burner",
      // the proper extensions will be added
      fileName: "index",
    },
  },
  plugins: [],
});
