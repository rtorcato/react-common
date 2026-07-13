import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '~/components/ui/chart'

const meta: Meta<typeof ChartContainer> = {
	title: 'ui/Chart',
	component: ChartContainer,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChartContainer>

const data = [
	{ month: 'Jan', desktop: 186, mobile: 80 },
	{ month: 'Feb', desktop: 305, mobile: 200 },
	{ month: 'Mar', desktop: 237, mobile: 120 },
	{ month: 'Apr', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'Jun', desktop: 214, mobile: 140 },
]

const config = {
	desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
	mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig

export const Bars: Story = {
	render: () => (
		<ChartContainer config={config} className="min-h-[280px] w-[480px]">
			<BarChart data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
			</BarChart>
		</ChartContainer>
	),
}
