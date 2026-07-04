import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '~/components/ui/input'

const meta = {
	title: 'ui/Input',
	component: Input,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: 'Type something…' } }
export const Email: Story = {
	args: { type: 'email', placeholder: 'you@example.com' },
}
export const Disabled: Story = {
	args: { disabled: true, placeholder: 'Disabled' },
}
export const WithValue: Story = { args: { defaultValue: 'hello' } }
