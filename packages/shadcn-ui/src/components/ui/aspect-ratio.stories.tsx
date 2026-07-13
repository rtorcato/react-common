import type { Meta, StoryObj } from '@storybook/react-vite'

import { AspectRatio } from '~/components/ui/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
	title: 'ui/AspectRatio',
	component: AspectRatio,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
	render: () => (
		<div className="w-[420px]">
			<AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
				<div className="flex h-full items-center justify-center text-muted-foreground">
					16:9
				</div>
			</AspectRatio>
		</div>
	),
}

export const Square: Story = {
	render: () => (
		<div className="w-[260px]">
			<AspectRatio ratio={1} className="bg-muted rounded-md">
				<div className="flex h-full items-center justify-center text-muted-foreground">
					1:1
				</div>
			</AspectRatio>
		</div>
	),
}
