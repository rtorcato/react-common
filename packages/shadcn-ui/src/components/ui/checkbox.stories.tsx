import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'

const meta = {
	title: 'ui/Checkbox',
	component: Checkbox,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { 'aria-label': 'agree' } }

export const WithLabel: Story = {
	render: (args) => (
		<div className="flex items-center gap-2">
			<Checkbox id="terms" {...args} />
			<Label htmlFor="terms">I agree to the terms</Label>
		</div>
	),
}

export const Checked: Story = { args: { defaultChecked: true, 'aria-label': 'agree' } }
export const Disabled: Story = { args: { disabled: true, 'aria-label': 'agree' } }
