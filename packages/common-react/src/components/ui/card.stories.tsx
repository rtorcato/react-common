import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'

const meta: Meta<typeof Card> = {
	title: 'ui/Card',
	component: Card,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
	render: () => (
		<Card style={{ width: 320 }}>
			<CardHeader>
				<CardTitle>Card title</CardTitle>
				<CardDescription>Card description text.</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm">Card content goes here.</p>
			</CardContent>
			<CardFooter>
				<Button>Action</Button>
			</CardFooter>
		</Card>
	),
}

export const WithAction: Story = {
	render: () => (
		<Card style={{ width: 360 }}>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						View
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	),
}
