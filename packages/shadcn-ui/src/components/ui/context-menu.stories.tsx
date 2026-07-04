import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from '~/components/ui/context-menu'

const meta: Meta<typeof ContextMenu> = {
	title: 'ui/ContextMenu',
	component: ContextMenu,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-[150px] w-[320px] items-center justify-center rounded-md border border-dashed text-sm">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-56">
				<ContextMenuItem>
					Back
					<ContextMenuShortcut>⌘[</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem disabled>
					Forward
					<ContextMenuShortcut>⌘]</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					Reload
					<ContextMenuShortcut>⌘R</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
}
