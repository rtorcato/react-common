import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold } from 'lucide-react'

import { Toggle } from '~/components/ui/toggle'

const meta = {
	title: 'ui/Toggle',
	component: Toggle,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['default', 'outline'],
		},
		size: {
			control: 'inline-radio',
			options: ['default', 'sm', 'lg'],
		},
	},
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		'aria-label': 'Toggle bold',
		children: <Bold className="h-4 w-4" />,
	},
}

export const Outline: Story = {
	args: {
		variant: 'outline',
		'aria-label': 'Toggle bold',
		children: <Bold className="h-4 w-4" />,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		'aria-label': 'Toggle bold',
		children: <Bold className="h-4 w-4" />,
	},
}
