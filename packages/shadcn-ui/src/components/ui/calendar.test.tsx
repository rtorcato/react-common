import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Calendar } from '~/components/ui/calendar'

describe('Calendar', () => {
	it('renders the root with data-slot="calendar"', () => {
		render(<Calendar mode="single" defaultMonth={new Date(2026, 4, 1)} />)

		expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
	})

	// guards the react-day-picker v10 migration: month_grid classNames key + WeekNumber cell
	it('renders the month grid and week numbers without leaking the week prop', () => {
		const { container } = render(
			<Calendar mode="single" showWeekNumber defaultMonth={new Date(2026, 4, 1)} />,
		)

		const grid = container.querySelector('table')
		expect(grid).toBeInTheDocument()
		expect(grid).toHaveClass('border-collapse')
		// week-number cells render (5–6 weeks in May 2026) and carry no stray `week` attribute
		const weekNumberCell = container.querySelector('td div.flex')
		expect(weekNumberCell).toBeInTheDocument()
		expect(container.querySelector('[week]')).toBeNull()
	})
})
