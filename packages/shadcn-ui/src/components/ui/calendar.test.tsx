import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Calendar } from '~/components/ui/calendar'

describe('Calendar', () => {
	it('renders the root with data-slot="calendar"', () => {
		render(<Calendar mode="single" defaultMonth={new Date(2026, 4, 1)} />)

		expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
	})
})
