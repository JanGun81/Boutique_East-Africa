import { defineConfig, devices } from "@playwright/test";

/** Egen port så E2E inte krockar med `npm run dev` på 3000 i samma maskin. */
const e2ePort = process.env.PLAYWRIGHT_DEV_PORT ?? "3030";
const e2eOrigin = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${e2ePort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: e2eOrigin,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: e2eOrigin,
    reuseExistingServer: !process.env.CI,
    env: { ...process.env, PORT: e2ePort },
  },
});
