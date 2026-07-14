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
	async viteFinal(viteConfig, { configType }) {
		viteConfig.resolve ??= {}
		viteConfig.resolve.alias = {
			...viteConfig.resolve.alias,
			'@': path.resolve(process.cwd(), 'src'),
			'~': path.resolve(process.cwd(), 'src'),
		}
		// The production build is deployed under the docs Pages site at
		// /react-common/storybook/ (see .github/workflows/docs.yml). Dev stays at /.
		if (configType === 'PRODUCTION') {
			viteConfig.base = '/react-common/storybook/'
		}
		return viteConfig
	},
}

export default config
