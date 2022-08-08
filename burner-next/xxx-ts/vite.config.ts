import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/counter.ts"),
      name: "burner",
      // the proper extensions will be added
      fileName: "burner",
    },
    build: {},
  },
  plugins: [],
});

