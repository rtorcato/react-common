import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '~/components/ui/slider'

const meta = {
	title: 'ui/Slider',
	component: Slider,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { defaultValue: [50], max: 100, step: 1 },
	render: (args) => <Slider {...args} className="w-[320px]" />,
}

export const Range: Story = {
	args: { defaultValue: [25, 75], max: 100, step: 1 },
	render: (args) => <Slider {...args} className="w-[320px]" />,
}
