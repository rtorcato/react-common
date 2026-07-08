import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRight, Folder } from 'lucide-react'

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '~/components/ui/item'

const meta: Meta<typeof Item> = {
	title: 'ui/Item',
	component: Item,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {
	render: () => (
		<Item className="w-[420px]">
			<ItemMedia>
				<Folder className="h-5 w-5" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Documents</ItemTitle>
				<ItemDescription>12 files · updated yesterday</ItemDescription>
			</ItemContent>
			<ItemActions>
				<ChevronRight className="h-4 w-4 text-muted-foreground" />
			</ItemActions>
		</Item>
	),
}
