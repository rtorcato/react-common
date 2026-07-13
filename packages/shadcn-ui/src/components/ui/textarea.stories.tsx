import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from '~/components/ui/textarea'

const meta = {
	title: 'ui/Textarea',
	component: Textarea,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { placeholder: 'Type your message here.', className: 'w-[320px]' },
}

export const Disabled: Story = {
	args: { placeholder: 'Type your message here.', disabled: true, className: 'w-[320px]' },
}
