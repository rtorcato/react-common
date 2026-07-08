import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '~/components/ui/input'

describe('Input', () => {
	it('renders an <input> with data-slot="input"', () => {
		render(<Input />)
		const input = screen.getByRole('textbox')
		expect(input.tagName).toBe('INPUT')
		expect(input).toHaveAttribute('data-slot', 'input')
	})

	it('passes through type attribute', () => {
		render(<Input type="email" />)
		// email inputs are not role="textbox" — query by selector
		const input = document.querySelector('input')
		expect(input).toHaveAttribute('type', 'email')
	})

	it('passes through placeholder attribute', () => {
		render(<Input placeholder="Enter your name" />)
		expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
	})

	it('passes through arbitrary HTML attributes', () => {
		render(<Input aria-label="search" name="q" />)
		const input = screen.getByRole('textbox', { name: 'search' })
		expect(input).toHaveAttribute('name', 'q')
	})

	it('disables the input when disabled prop is set', () => {
		render(<Input disabled />)
		const input = document.querySelector('input')
		expect(input).toBeDisabled()
	})

	it('fires onChange with the correct value', async () => {
		const user = userEvent.setup()
		const handleChange = vi.fn()
		render(<Input onChange={handleChange} />)
		const input = screen.getByRole('textbox')
		await user.type(input, 'hello')
		expect(handleChange).toHaveBeenCalled()
		expect(input).toHaveValue('hello')
	})
})
