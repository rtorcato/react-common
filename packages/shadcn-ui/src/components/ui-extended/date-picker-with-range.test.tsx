import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import DatePickerWithRange from '~/components/ui-extended/date-picker-with-range'

describe('DatePickerWithRange', () => {
	it('renders the "Pick a date" placeholder when uncontrolled with no default', () => {
		render(<DatePickerWithRange />)
		expect(screen.getByRole('button')).toHaveTextContent('Pick a date')
	})

	it('renders a controlled range', () => {
		render(
			<DatePickerWithRange value={{ from: new Date(2022, 0, 20), to: new Date(2022, 1, 9) }} />
		)

		const trigger = screen.getByRole('button')
		expect(trigger).toHaveTextContent('Jan 20, 2022')
		expect(trigger).toHaveTextContent('Feb 09, 2022')
	})

	it('honours an uncontrolled defaultValue', () => {
		render(<DatePickerWithRange defaultValue={{ from: new Date(2022, 0, 20) }} />)
		expect(screen.getByRole('button')).toHaveTextContent('Jan 20, 2022')
	})

	it('clicking the button shows the Calendar popover', async () => {
		const user = userEvent.setup()
		render(<DatePickerWithRange />)

		expect(screen.queryByRole('grid')).not.toBeInTheDocument()

		await user.click(screen.getByRole('button'))

		// react-day-picker renders a <table role="grid"> for the calendar
		expect(screen.getAllByRole('grid').length).toBeGreaterThan(0)
	})
})
