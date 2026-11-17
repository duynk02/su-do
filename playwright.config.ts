import { defineConfig, devices } from "@playwright/test";
const testPort = process.env.SU_DO_TEST_PORT ?? "3100";
const baseURL = `http://127.0.0.1:${testPort}`;
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  timeout: 30000,
  use: {
    baseURL,
    headless: true,
    channel: "msedge",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve.mjs",
    env: { PORT: testPort },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 960 } } },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        channel: "msedge",
      },
    },
  ],
});
