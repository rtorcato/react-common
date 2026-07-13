import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider, useTheme } from '~/theme-provider'

function ThemeProbe() {
	const { theme, themes } = useTheme()
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<span data-testid="themes">{themes.join(',')}</span>
		</div>
	)
}

describe('ThemeProvider', () => {
	it('renders its children', () => {
		render(
			<ThemeProvider>
				<span>hello</span>
			</ThemeProvider>
		)
		expect(screen.getByText('hello')).toBeInTheDocument()
	})

	it('forwards props to next-themes (defaultTheme + custom themes)', () => {
		render(
			<ThemeProvider
				defaultTheme="dark"
				themes={['light', 'dark', 'solarized']}
				enableSystem={false}
			>
				<ThemeProbe />
			</ThemeProvider>
		)
		expect(screen.getByTestId('theme')).toHaveTextContent('dark')
		expect(screen.getByTestId('themes')).toHaveTextContent('light,dark,solarized')
	})
})
