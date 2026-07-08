import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { MultiSelect } from '~/components/ui-extended/multi-select'

const options = [
	{ label: 'TypeScript', value: 'typescript' },
	{ label: 'Rust', value: 'rust' },
	{ label: 'Go', value: 'go' },
	{ label: 'Python', value: 'python' },
	{ label: 'Elixir', value: 'elixir' },
]

const meta = {
	title: 'ui-extended/MultiSelect',
	component: MultiSelect,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>([])
		return (
			<div style={{ width: 320 }}>
				<MultiSelect {...args} value={value} onValueChange={setValue} />
			</div>
		)
	},
	args: { options, placeholder: 'Pick languages…' },
}

export const Preselected: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>(['typescript', 'rust'])
		return (
			<div style={{ width: 320 }}>
				<MultiSelect {...args} value={value} onValueChange={setValue} />
			</div>
		)
	},
	args: { options },
}
