import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const macChrome =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (process.platform === 'darwin' && existsSync(macChrome)
    ? macChrome
    : undefined);

// Another checkout or worktree may already be serving on 5173, and
// reuseExistingServer would then test that code instead of this one.
// Set PLAYWRIGHT_PORT to an unused port to force a server for this tree.
const port = process.env.PLAYWRIGHT_PORT || '5173';
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL,
    browserName: 'chromium',
    launchOptions: { executablePath },
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run dev -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: true,
  },
});
