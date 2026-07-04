import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { Calendar } from '~/components/ui/calendar'

const meta: Meta<typeof Calendar> = {
	title: 'ui/Calendar',
	component: Calendar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Single: Story = {
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date())
		return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
	},
}

export const Range: Story = {
	render: () => {
		const [range, setRange] = useState<DateRange | undefined>()
		return (
			<Calendar
				mode="range"
				selected={range}
				onSelect={setRange}
				numberOfMonths={2}
				className="rounded-md border"
			/>
		)
	},
}
