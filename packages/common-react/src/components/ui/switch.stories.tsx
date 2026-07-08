import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'

const meta = {
	title: 'ui/Switch',
	component: Switch,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'inline-radio', options: ['default', 'sm'] },
	},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { 'aria-label': 'notifications' } }

export const WithLabel: Story = {
	render: (args) => (
		<div className="flex items-center gap-2">
			<Switch id="notifications" {...args} />
			<Label htmlFor="notifications">Enable notifications</Label>
		</div>
	),
}

export const Small: Story = { args: { size: 'sm', 'aria-label': 'notifications' } }
export const Disabled: Story = { args: { disabled: true, 'aria-label': 'notifications' } }
