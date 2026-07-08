import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'

// Helper: a minimal controlled select used across tests
function TestSelect({
	onValueChange,
	value,
}: {
	onValueChange?: (v: string) => void
	value?: string
}) {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger>
				<SelectValue placeholder="Choose…" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
			</SelectContent>
		</Select>
	)
}

describe('SelectTrigger', () => {
	it('renders with data-slot="select-trigger"', () => {
		render(<TestSelect />)
		expect(screen.getByRole('combobox')).toHaveAttribute('data-slot', 'select-trigger')
	})

	it('renders with default data-size="default"', () => {
		render(<TestSelect />)
		expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'default')
	})

	it('renders with data-size="sm" when size prop is "sm"', () => {
		render(
			<Select>
				<SelectTrigger size="sm">
					<SelectValue placeholder="Choose…" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="a">A</SelectItem>
				</SelectContent>
			</Select>
		)
		expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'sm')
	})
})

describe('Select controlled value / onValueChange', () => {
	it('calls onValueChange with the selected item value', async () => {
		const user = userEvent.setup()
		const handleChange = vi.fn()
		render(<TestSelect onValueChange={handleChange} />)

		// Open the dropdown
		await user.click(screen.getByRole('combobox'))

		// The list items are rendered into a portal — query via role
		const option = await screen.findByRole('option', { name: 'Apple' })
		await user.click(option)

		expect(handleChange).toHaveBeenCalledOnce()
		expect(handleChange).toHaveBeenCalledWith('apple')
	})

	it('displays the selected value when a value is provided', async () => {
		const user = userEvent.setup()
		const handleChange = vi.fn()
		render(<TestSelect value="banana" onValueChange={handleChange} />)

		expect(screen.getByRole('combobox')).toHaveTextContent('Banana')

		// Open and pick a different option
		await user.click(screen.getByRole('combobox'))
		const option = await screen.findByRole('option', { name: 'Apple' })
		await user.click(option)

		expect(handleChange).toHaveBeenCalledWith('apple')
	})
})
