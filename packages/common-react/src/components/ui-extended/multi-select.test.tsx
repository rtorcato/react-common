import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelect } from '~/components/ui-extended/multi-select'

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
]

describe('MultiSelect', () => {
	it('shows the placeholder when no values are selected', () => {
		render(<MultiSelect options={options} placeholder="Pick fruits…" />)
		expect(screen.getByText('Pick fruits…')).toBeInTheDocument()
	})

	it('renders selected values as badges', () => {
		render(<MultiSelect options={options} value={['apple', 'cherry']} />)
		// Both badges are visible inside the trigger
		expect(screen.getByText('Apple')).toBeInTheDocument()
		expect(screen.getByText('Cherry')).toBeInTheDocument()
		expect(screen.queryByText('Banana')).not.toBeInTheDocument()
	})

	it('clicking a badge remove button calls onValueChange with that value omitted', async () => {
		const user = userEvent.setup()
		const onValueChange = vi.fn()
		render(
			<MultiSelect options={options} value={['apple', 'banana']} onValueChange={onValueChange} />
		)

		await user.click(screen.getByRole('button', { name: /remove apple/i }))

		expect(onValueChange).toHaveBeenCalledWith(['banana'])
	})

	it('disables the trigger when disabled=true', () => {
		render(<MultiSelect options={options} disabled />)
		expect(screen.getByRole('combobox')).toBeDisabled()
	})

	it('exposes aria-expanded on the trigger', () => {
		render(<MultiSelect options={options} />)
		const trigger = screen.getByRole('combobox')
		expect(trigger).toHaveAttribute('aria-expanded', 'false')
	})
})
