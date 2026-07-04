import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
	title: 'ui/NavigationMenu',
	component: NavigationMenu,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
	render: () => (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 w-[400px]">
							<li>
								<NavigationMenuLink href="#">Introduction</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="#">Installation</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="#">Typography</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="#" className="px-4 py-2 text-sm font-medium">
						Documentation
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	),
}
