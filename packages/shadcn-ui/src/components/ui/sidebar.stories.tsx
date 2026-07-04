import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Inbox, Settings } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '~/components/ui/sidebar'

const meta: Meta<typeof Sidebar> = {
	title: 'ui/Sidebar',
	component: Sidebar,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="p-4 font-semibold">Workspace</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Navigation</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<Home className="h-4 w-4" />
										<span>Home</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<Inbox className="h-4 w-4" />
										<span>Inbox</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<Settings className="h-4 w-4" />
										<span>Settings</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<main className="flex-1 p-4">
				<SidebarTrigger />
				<div className="mt-4 text-sm text-muted-foreground">Main content area.</div>
			</main>
		</SidebarProvider>
	),
}
