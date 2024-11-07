import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "./src",
  test: {
    coverage: {
      include: ["lib/database/**"],
    },
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
  plugins: [tsconfigPaths()],
});
