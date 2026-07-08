import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover'

describe('Popover', () => {
	it('renders the trigger with data-slot="popover-trigger"', () => {
		render(
			<Popover>
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>contents</PopoverContent>
			</Popover>
		)
		expect(screen.getByText('Open')).toHaveAttribute('data-slot', 'popover-trigger')
	})

	it('opens the popover content when the trigger is clicked', async () => {
		const user = userEvent.setup()
		render(
			<Popover>
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>contents</PopoverContent>
			</Popover>
		)

		expect(screen.queryByText('contents')).not.toBeInTheDocument()
		await user.click(screen.getByText('Open'))
		expect(screen.getByText('contents')).toBeInTheDocument()
	})
})
