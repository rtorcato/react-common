import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'

const meta: Meta<typeof Label> = {
	title: 'ui/Label',
	component: Label,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
}
