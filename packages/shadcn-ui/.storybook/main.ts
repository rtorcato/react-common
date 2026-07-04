import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	framework: '@storybook/react-vite',
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
	},
	async viteFinal(viteConfig) {
		viteConfig.resolve ??= {}
		viteConfig.resolve.alias = {
			...viteConfig.resolve.alias,
			'@': path.resolve(process.cwd(), 'src'),
			'~': path.resolve(process.cwd(), 'src'),
		}
		return viteConfig
	},
}

export default config
