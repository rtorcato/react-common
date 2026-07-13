import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Label } from '~/components/ui/label'

describe('Label', () => {
	it('renders with data-slot="label"', () => {
		render(<Label>Email</Label>)
		const label = screen.getByText('Email')
		expect(label).toHaveAttribute('data-slot', 'label')
	})

	it('forwards htmlFor to the underlying label', () => {
		render(<Label htmlFor="email-input">Email</Label>)
		expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input')
	})

	it('clicking the label focuses the associated input', async () => {
		const user = userEvent.setup()
		render(
			<>
				<Label htmlFor="email-input">Email</Label>
				<input id="email-input" />
			</>
		)

		await user.click(screen.getByText('Email'))

		expect(screen.getByRole('textbox')).toHaveFocus()
	})

	it('merges a custom className', () => {
		render(<Label className="custom-class">Email</Label>)
		expect(screen.getByText('Email')).toHaveClass('custom-class')
	})
})
