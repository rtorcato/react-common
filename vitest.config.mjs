import path from 'node:path'
import { fileURLToPath } from 'node:url'
import base from '@rtorcato/js-tooling/vitest/config'
import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
	base,
	defineConfig({
		plugins: [react()],
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./src/test/setup.ts'],
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html'],
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
