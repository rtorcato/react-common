import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'

import '../src/styles/globals.css'
import './themes/orange.css'
import './themes/blue.css'
import './themes/rose.css'
import './themes/green.css'
import './themes/violet.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'light',
			values: [
				{ name: 'light', value: '#ffffff' },
				{ name: 'dark', value: '#0a0a0a' },
			],
		},
	},
	globalTypes: {
		mode: {
			name: 'Mode',
			description: 'Light or dark',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' },
				],
			},
		},
		radius: {
			name: 'Radius',
			description: 'Border radius',
			defaultValue: '0.5rem',
			toolbar: {
				icon: 'circle',
				items: [
					{ value: '0rem', title: '0' },
					{ value: '0.3rem', title: '0.3' },
					{ value: '0.5rem', title: '0.5' },
					{ value: '0.75rem', title: '0.75' },
					{ value: '1rem', title: '1.0' },
				],
			},
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				Default: '',
				Orange: 'theme-orange',
				Blue: 'theme-blue',
				Rose: 'theme-rose',
				Green: 'theme-green',
				Violet: 'theme-violet',
			},
			defaultTheme: 'Default',
			parentSelector: 'html',
		}),
		(Story, context) => {
			if (typeof document !== 'undefined') {
				const mode = context.globals.mode as string
				document.documentElement.classList.toggle('dark', mode === 'dark')
				const radius = context.globals.radius as string | undefined
				if (radius) document.documentElement.style.setProperty('--radius', radius)
			}
			return Story()
		},
	],
}

export default preview
