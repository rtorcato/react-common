import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '~/components/ui/carousel'
import { Card, CardContent } from '~/components/ui/card'

const meta: Meta<typeof Carousel> = {
	title: 'ui/Carousel',
	component: Carousel,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
	render: () => (
		<Carousel className="w-full max-w-xs">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">{index + 1}</span>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
}
