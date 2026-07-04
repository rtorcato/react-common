import type { Meta, StoryObj } from '@storybook/react-vite'
import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

const meta: Meta<typeof Alert> = {
	title: 'ui/Alert',
	component: Alert,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['default', 'destructive'],
		},
	},
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
	render: (args) => (
		<Alert {...args} className="w-[420px]">
			<Terminal className="h-4 w-4" />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>You can add components to your app using the CLI.</AlertDescription>
		</Alert>
	),
}

export const Destructive: Story = {
	args: { variant: 'destructive' },
	render: (args) => (
		<Alert {...args} className="w-[420px]">
			<Terminal className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>Your session has expired. Please log in again.</AlertDescription>
		</Alert>
	),
}
