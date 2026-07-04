import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import { PageHeader } from '~/components/ui-extended/page-header'

const meta = {
	title: 'ui-extended/PageHeader',
	component: PageHeader,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { title: 'Dashboard' },
}

export const WithDescription: Story = {
	args: {
		title: 'Settings',
		description: 'Manage your account preferences and integrations.',
	},
}

export const WithBreadcrumbsAndActions: Story = {
	args: {
		title: 'Members',
		description: 'Invite teammates and manage their roles.',
		breadcrumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Workspace', href: '/workspace' },
			{ label: 'Members' },
		],
		actions: <Button>Invite member</Button>,
	},
}
