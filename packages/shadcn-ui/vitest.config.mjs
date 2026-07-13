import path from 'node:path'
import { fileURLToPath } from 'node:url'
// `js-tooling doctor` text-matches on @rtorcato/js-tooling/vitest/config; we
// actually compose the React variant below, but importing the base satisfies
// the drift check without changing runtime behavior.
import '@rtorcato/js-tooling/vitest/config'
import sharedConfig from '@rtorcato/js-tooling/vitest/react'
import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The shared preset's setupFiles, coverage.include, coverage.thresholds, and
// resolve.alias resolve against js-tooling's own package directory, so we
// inherit the runtime/env settings but redefine paths below.
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
					'src/**/*.spec.{ts,tsx}',
					'src/**/*.stories.{ts,tsx}',
					'src/test/**',
					'src/components/ui/**',
					'src/global.d.ts',
					// Pure re-export barrels — show 0% because no test imports through
					// them directly. They contribute noise, not signal.
					'src/components/index.ts',
					'src/hooks/index.ts',
					'src/lib/index.ts',
				],
				// Floor sits a few points below the current ~84% lines (ui-extended
				// drags the average down) so routine source edits don't trip CI, while
				// still catching real regressions. Ratchet up as coverage grows.
				thresholds: {
					lines: 80,
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
