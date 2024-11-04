import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "../../",
  test: {
    globals: true,
    setupFiles: "./", // Optional: to manage database setup
  },
  plugins: [tsconfigPaths()],
});
