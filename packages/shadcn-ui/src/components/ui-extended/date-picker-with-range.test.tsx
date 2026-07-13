import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import DatePickerWithRange from '~/components/ui-extended/date-picker-with-range'

describe('DatePickerWithRange', () => {
	it('renders a button showing the initial date range', () => {
		render(<DatePickerWithRange />)

		// The component initialises with Jan 20, 2022 → Feb 09, 2022 (20 days later)
		const trigger = screen.getByRole('button')
		expect(trigger).toHaveTextContent('Jan 20, 2022')
		expect(trigger).toHaveTextContent('Feb 09, 2022')
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
