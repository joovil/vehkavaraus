import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**"],
      exclude: ["src/app", "src/components"],
    },
    fileParallelism: false,
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    include: ["./src/**/*.spec.ts"],
  },
  plugins: [tsconfigPaths()],
});
