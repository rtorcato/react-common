import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const meta: Meta<typeof Avatar> = {
	title: 'ui/Avatar',
	component: Avatar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	),
}

export const FallbackOnly: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src="" alt="" />
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	),
}
