import type { Meta, StoryObj } from '@storybook/react-vite'

import DatePickerWithRange from '~/components/ui-extended/date-picker-with-range'

const meta = {
	title: 'ui-extended/DatePickerWithRange',
	component: DatePickerWithRange,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof DatePickerWithRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
