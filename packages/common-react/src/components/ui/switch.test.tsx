import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from '~/components/ui/switch'

describe('Switch', () => {
	it('renders with data-slot="switch" and default size', () => {
		render(<Switch aria-label="notifications" />)
		const sw = screen.getByRole('switch')
		expect(sw).toHaveAttribute('data-slot', 'switch')
		expect(sw).toHaveAttribute('data-size', 'default')
	})

	it('renders with data-size="sm" when size="sm"', () => {
		render(<Switch aria-label="notifications" size="sm" />)
		expect(screen.getByRole('switch')).toHaveAttribute('data-size', 'sm')
	})

	it('toggles state on click and fires onCheckedChange', async () => {
		const user = userEvent.setup()
		const onCheckedChange = vi.fn()
		render(<Switch aria-label="notifications" onCheckedChange={onCheckedChange} />)

		const sw = screen.getByRole('switch')
		expect(sw).toHaveAttribute('data-state', 'unchecked')

		await user.click(sw)

		expect(sw).toHaveAttribute('data-state', 'checked')
		expect(onCheckedChange).toHaveBeenCalledWith(true)
	})

	it('respects the disabled prop', () => {
		render(<Switch aria-label="notifications" disabled />)
		expect(screen.getByRole('switch')).toBeDisabled()
	})
})
