import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'

describe('ToggleGroup', () => {
	it('renders items as buttons', () => {
		render(
			<ToggleGroup type="single">
				<ToggleGroupItem value="left">Left</ToggleGroupItem>
				<ToggleGroupItem value="center">Center</ToggleGroupItem>
			</ToggleGroup>
		)
		expect(screen.getByRole('radio', { name: 'Left' })).toBeInTheDocument()
		expect(screen.getByRole('radio', { name: 'Center' })).toBeInTheDocument()
	})

	it('fires onValueChange when an item is selected (type=single)', async () => {
		const user = userEvent.setup()
		const onValueChange = vi.fn()
		render(
			<ToggleGroup type="single" onValueChange={onValueChange}>
				<ToggleGroupItem value="left">Left</ToggleGroupItem>
				<ToggleGroupItem value="center">Center</ToggleGroupItem>
			</ToggleGroup>
		)

		await user.click(screen.getByRole('radio', { name: 'Center' }))
		expect(onValueChange).toHaveBeenCalledWith('center')
	})
})
