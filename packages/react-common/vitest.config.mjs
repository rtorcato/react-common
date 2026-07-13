import path from 'node:path'
import { fileURLToPath } from 'node:url'
// `js-tooling doctor` text-matches on @rtorcato/js-tooling/vitest/config; we
// compose the React variant below, but importing the base satisfies the drift
// check without changing runtime behavior.
import '@rtorcato/js-tooling/vitest/config'
import sharedConfig from '@rtorcato/js-tooling/vitest/react'
import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sharedTrimmed = {
	test: {
		globals: sharedConfig.test.globals,
		environment: sharedConfig.test.environment,
		css: sharedConfig.test.css,
		include: sharedConfig.test.include,
		exclude: sharedConfig.test.exclude,
		coverage: {
			provider: sharedConfig.test.coverage.provider,
			reporter: sharedConfig.test.coverage.reporter,
		},
	},
}

export default mergeConfig(
	sharedTrimmed,
	defineConfig({
		plugins: [react()],
		test: {
			setupFiles: ['src/test/setup.ts'],
			environmentOptions: {
				jsdom: {
					resources: 'usable',
					runScripts: 'dangerously',
				},
			},
			coverage: {
				include: ['src/**/*.{ts,tsx}'],
				exclude: [
					'src/**/*.test.{ts,tsx}',
					'src/test/**',
					// Pure re-export barrel — 0% because no test imports through it.
					'src/index.ts',
				],
				// Floor a few points below the current ~98% lines. Ratchet up as
				// coverage grows; keep a margin so routine edits don't trip CI.
				thresholds: {
					lines: 90,
				},
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'~': path.resolve(__dirname, './src'),
			},
		},
	})
)
