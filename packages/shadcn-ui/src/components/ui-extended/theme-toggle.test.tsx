import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeToggle } from '~/components/ui-extended/theme-toggle'

const setTheme = vi.fn()
let mockTheme = 'light'

vi.mock('next-themes', () => ({
	useTheme: () => ({ resolvedTheme: mockTheme, setTheme }),
}))

describe('ThemeToggle', () => {
	it('renders an accessible toggle button', () => {
		render(<ThemeToggle />)
		expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
	})

	it('switches to dark when currently light', async () => {
		mockTheme = 'light'
		render(<ThemeToggle />)
		await userEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
		expect(setTheme).toHaveBeenLastCalledWith('dark')
	})

	it('switches to light when currently dark', async () => {
		mockTheme = 'dark'
		render(<ThemeToggle />)
		await userEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
		expect(setTheme).toHaveBeenLastCalledWith('light')
	})

	it('honours a custom label', () => {
		render(<ThemeToggle label="Switch color scheme" />)
		expect(screen.getByRole('button', { name: 'Switch color scheme' })).toBeInTheDocument()
	})
})
