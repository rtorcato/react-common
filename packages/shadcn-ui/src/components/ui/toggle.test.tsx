import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Toggle } from '~/components/ui/toggle'

describe('Toggle', () => {
	it('renders with data-slot="toggle" and aria-pressed="false" by default', () => {
		render(<Toggle aria-label="bold">B</Toggle>)
		const btn = screen.getByRole('button', { pressed: false })
		expect(btn).toHaveAttribute('data-slot', 'toggle')
	})

	it('toggles aria-pressed when clicked', async () => {
		const user = userEvent.setup()
		render(<Toggle aria-label="bold">B</Toggle>)

		const btn = screen.getByRole('button')
		await user.click(btn)
		expect(btn).toHaveAttribute('aria-pressed', 'true')
	})
})
