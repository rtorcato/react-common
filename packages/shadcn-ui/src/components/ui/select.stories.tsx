import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'

const meta: Meta<typeof Select> = {
	title: 'ui/Select',
	component: Select,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
	render: () => (
		<div style={{ width: 220 }}>
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Pick a fruit…" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="cherry">Cherry</SelectItem>
				</SelectContent>
			</Select>
		</div>
	),
}

export const Small: Story = {
	render: () => (
		<div style={{ width: 220 }}>
			<Select>
				<SelectTrigger size="sm">
					<SelectValue placeholder="Small trigger…" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="a">A</SelectItem>
					<SelectItem value="b">B</SelectItem>
				</SelectContent>
			</Select>
		</div>
	),
}
