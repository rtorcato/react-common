import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from '~/components/ui/checkbox'

describe('Checkbox', () => {
	it('renders with data-slot="checkbox"', () => {
		render(<Checkbox aria-label="agree" />)
		expect(screen.getByRole('checkbox')).toHaveAttribute('data-slot', 'checkbox')
	})

	it('is unchecked by default and toggles on click', async () => {
		const user = userEvent.setup()
		render(<Checkbox aria-label="agree" />)

		const box = screen.getByRole('checkbox')
		expect(box).toHaveAttribute('data-state', 'unchecked')

		await user.click(box)
		expect(box).toHaveAttribute('data-state', 'checked')
	})

	it('fires onCheckedChange with the next state', async () => {
		const user = userEvent.setup()
		const onCheckedChange = vi.fn()
		render(<Checkbox aria-label="agree" onCheckedChange={onCheckedChange} />)

		await user.click(screen.getByRole('checkbox'))

		expect(onCheckedChange).toHaveBeenCalledWith(true)
	})

	it('respects the disabled prop', () => {
		render(<Checkbox aria-label="agree" disabled />)
		expect(screen.getByRole('checkbox')).toBeDisabled()
	})
})
