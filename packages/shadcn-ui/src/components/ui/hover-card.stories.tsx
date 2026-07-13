import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

const meta: Meta<typeof HoverCard> = {
	title: 'ui/HoverCard',
	component: HoverCard,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link">@nextjs</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="space-y-1">
					<h4 className="text-sm font-semibold">@nextjs</h4>
					<p className="text-sm">The React Framework — created and maintained by Vercel.</p>
				</div>
			</HoverCardContent>
		</HoverCard>
	),
}
