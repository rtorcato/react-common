import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '~/components/ui/badge'

const meta = {
	title: 'ui/Badge',
	component: Badge,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
		},
	},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'New' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Beta' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Error' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Draft' } }
