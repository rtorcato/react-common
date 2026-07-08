import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '~/components/ui/tabs'

const meta: Meta<typeof Tabs> = {
	title: 'ui/Tabs',
	component: Tabs,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="account" style={{ width: 400 }}>
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="team">Team</TabsTrigger>
			</TabsList>
			<TabsContent value="account">Account settings panel.</TabsContent>
			<TabsContent value="password">Password settings panel.</TabsContent>
			<TabsContent value="team">Team settings panel.</TabsContent>
		</Tabs>
	),
}
