import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from '~/components/ui/textarea'

describe('Textarea', () => {
	it('renders with data-slot="textarea"', () => {
		render(<Textarea aria-label="note" />)
		expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'textarea')
	})

	it('forwards the placeholder prop', () => {
		render(<Textarea aria-label="note" placeholder="Write a note…" />)
		expect(screen.getByPlaceholderText('Write a note…')).toBeInTheDocument()
	})

	it('fires onChange when the user types', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Textarea aria-label="note" onChange={onChange} />)

		await user.type(screen.getByRole('textbox'), 'hello')

		expect(onChange).toHaveBeenCalled()
		expect(screen.getByRole('textbox')).toHaveValue('hello')
	})

	it('respects the disabled prop', () => {
		render(<Textarea aria-label="note" disabled />)
		expect(screen.getByRole('textbox')).toBeDisabled()
	})

	it('merges a custom className', () => {
		render(<Textarea aria-label="note" className="custom-class" />)
		expect(screen.getByRole('textbox')).toHaveClass('custom-class')
	})
})
