import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'

const meta: Meta<typeof InputGroup> = {
	title: 'ui/InputGroup',
	component: InputGroup,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const WithLeadingIcon: Story = {
	render: () => (
		<InputGroup className="w-[320px]">
			<InputGroupAddon>
				<Search className="h-4 w-4" />
			</InputGroupAddon>
			<InputGroupInput placeholder="Search…" />
		</InputGroup>
	),
}
