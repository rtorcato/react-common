import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

describe('RadioGroup', () => {
	it('renders all options as radios', () => {
		render(
			<RadioGroup defaultValue="a">
				<RadioGroupItem value="a" aria-label="A" />
				<RadioGroupItem value="b" aria-label="B" />
			</RadioGroup>
		)
		expect(screen.getAllByRole('radio')).toHaveLength(2)
	})

	it('fires onValueChange when an option is selected', async () => {
		const user = userEvent.setup()
		const onValueChange = vi.fn()
		render(
			<RadioGroup onValueChange={onValueChange}>
				<RadioGroupItem value="a" aria-label="A" />
				<RadioGroupItem value="b" aria-label="B" />
			</RadioGroup>
		)

		await user.click(screen.getByRole('radio', { name: 'B' }))
		expect(onValueChange).toHaveBeenCalledWith('b')
	})
})
