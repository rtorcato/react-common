import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Test config lives in vitest.config.mjs, which Vitest resolves ahead of this
// file. This one stays because Storybook's react-vite framework merges it.
export default defineConfig({
	plugins: [react()],
})
