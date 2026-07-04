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
