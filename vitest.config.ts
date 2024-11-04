import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/tests/setup.ts", "./src/lib/utils/envVariables.ts"],
  },
  plugins: [tsconfigPaths()],
});
