import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the react-common docs site.
 *
 * - Boots the production build via `pnpm serve` (port 3000). The built site is
 *   closer to what users hit on GitHub Pages and avoids HMR-related flake.
 * - Two chromium projects: mobile (Pixel 7) and desktop (1280x720). The mobile
 *   navbar drawer is the main thing worth pinning, so mobile is primary.
 * - Behavioral smoke tests only — no screenshot/visual assertions yet.
 */

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}/react-common/`

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: BASE_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'mobile',
			use: { ...devices['Pixel 7'] },
		},
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
		},
	],
	webServer: {
		// `serve` requires a prior `build`. Chaining them keeps a single
		// `pnpm test:e2e` working from a clean checkout.
		command: `pnpm run build && pnpm run serve --port ${PORT}`,
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
		stdout: 'ignore',
		stderr: 'pipe',
	},
})
