import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider, useTheme } from '~/components/theme-provider'

// theme-provider is a thin re-export of next-themes. These tests guard the
// re-export contract (symbols resolve) and that the provider + hook wire up
// together — not next-themes' internals.

function ThemeProbe() {
	const { theme, setTheme } = useTheme()
	return (
		<span data-testid="probe">
			{typeof setTheme === 'function' ? 'ready' : 'broken'}:{theme ?? 'unset'}
		</span>
	)
}

describe('theme-provider', () => {
	it('re-exports ThemeProvider and useTheme from next-themes', () => {
		expect(ThemeProvider).toBeDefined()
		expect(typeof useTheme).toBe('function')
	})

	it('provides a working theme context to consumers', () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
				<ThemeProbe />
			</ThemeProvider>
		)
		expect(screen.getByTestId('probe')).toHaveTextContent('ready:light')
	})
})
