import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '~/components/ui/sidebar'

describe('Sidebar', () => {
	it('renders sidebar shell with header/content/footer + trigger', () => {
		render(
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>header</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton>item</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>footer</SidebarFooter>
				</Sidebar>
				<SidebarTrigger />
			</SidebarProvider>
		)

		expect(document.querySelector('[data-slot="sidebar"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="sidebar-header"]')).toHaveTextContent('header')
		expect(document.querySelector('[data-slot="sidebar-content"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="sidebar-footer"]')).toHaveTextContent('footer')
		expect(document.querySelector('[data-slot="sidebar-trigger"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="sidebar-menu-button"]')).toHaveTextContent('item')
	})
})
