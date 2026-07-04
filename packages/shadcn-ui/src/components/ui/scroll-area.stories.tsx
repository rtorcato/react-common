import type { Meta, StoryObj } from '@storybook/react-vite'

import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'

const meta: Meta<typeof ScrollArea> = {
	title: 'ui/ScrollArea',
	component: ScrollArea,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.0-beta.${i + 1}`)

export const Default: Story = {
	render: () => (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{tags.map((tag) => (
					<div key={tag}>
						<div className="text-sm">{tag}</div>
						<Separator className="my-2" />
					</div>
				))}
			</div>
		</ScrollArea>
	),
}
