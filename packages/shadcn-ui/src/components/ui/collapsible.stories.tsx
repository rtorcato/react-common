import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '~/components/ui/collapsible'

const meta: Meta<typeof Collapsible> = {
	title: 'ui/Collapsible',
	component: Collapsible,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
	render: () => (
		<Collapsible className="w-[320px] space-y-2">
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm">
						Toggle
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
				<div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
			</CollapsibleContent>
		</Collapsible>
	),
}
