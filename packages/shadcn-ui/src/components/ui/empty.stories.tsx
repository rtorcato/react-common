import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inbox } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '~/components/ui/empty'

const meta: Meta<typeof Empty> = {
	title: 'ui/Empty',
	component: Empty,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
	render: () => (
		<Empty className="w-[420px]">
			<EmptyHeader>
				<EmptyMedia>
					<Inbox className="h-10 w-10 text-muted-foreground" />
				</EmptyMedia>
				<EmptyTitle>No messages yet</EmptyTitle>
				<EmptyDescription>
					Your inbox is empty. Once someone sends you a message, it will show up here.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button>Compose</Button>
			</EmptyContent>
		</Empty>
	),
}
