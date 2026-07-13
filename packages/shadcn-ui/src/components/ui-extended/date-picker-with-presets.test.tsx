import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import DatePickerWithPresets from '~/components/ui-extended/date-picker-with-presets'

describe('DatePickerWithPresets', () => {
	it('renders a button with "Pick a date" placeholder when no date is selected', () => {
		render(<DatePickerWithPresets />)
		expect(screen.getByRole('button')).toHaveTextContent('Pick a date')
	})

	it('clicking the button opens the popover containing a Select and a Calendar', async () => {
		const user = userEvent.setup()
		render(<DatePickerWithPresets />)

		await user.click(screen.getByRole('button', { name: /pick a date/i }))

		// The Select trigger is now visible inside the popover
		expect(screen.getByRole('combobox')).toBeInTheDocument()

		// react-day-picker renders a <table role="grid"> for the calendar
		expect(screen.getByRole('grid')).toBeInTheDocument()
	})
})
