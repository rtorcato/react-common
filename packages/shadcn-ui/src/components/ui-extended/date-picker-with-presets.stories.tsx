import type { Meta, StoryObj } from '@storybook/react-vite'

import DatePickerWithPresets from '~/components/ui-extended/date-picker-with-presets'

const meta = {
	title: 'ui-extended/DatePickerWithPresets',
	component: DatePickerWithPresets,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof DatePickerWithPresets>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
	args: { defaultValue: new Date() },
}

export const CustomPresets: Story = {
	args: {
		presets: [
			{ label: 'Today', days: 0 },
			{ label: 'In 2 weeks', days: 14 },
			{ label: 'In 30 days', days: 30 },
		],
	},
}
