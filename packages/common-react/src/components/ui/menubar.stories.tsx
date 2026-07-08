import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '~/components/ui/menubar'

const meta: Meta<typeof Menubar> = {
	title: 'ui/Menubar',
	component: Menubar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
	render: () => (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New tab <MenubarShortcut>⌘T</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						New window <MenubarShortcut>⌘N</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Print…</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo <MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	),
}
