import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '~/components/ui/button-group'

const meta: Meta<typeof ButtonGroup> = {
	title: 'ui/ButtonGroup',
	component: ButtonGroup,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant="outline">Profile</Button>
			<Button variant="outline">Settings</Button>
			<Button variant="outline">Logout</Button>
		</ButtonGroup>
	),
}

export const WithSeparator: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant="outline">Copy</Button>
			<ButtonGroupSeparator />
			<Button variant="outline">Paste</Button>
		</ButtonGroup>
	),
}
