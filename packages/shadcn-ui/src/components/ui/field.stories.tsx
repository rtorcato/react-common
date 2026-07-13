import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'

const meta: Meta<typeof Field> = {
	title: 'ui/Field',
	component: Field,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
	render: () => (
		<Field className="w-[320px]">
			<FieldLabel htmlFor="email">Email</FieldLabel>
			<Input id="email" type="email" placeholder="you@example.com" />
			<FieldDescription>We'll never share your address.</FieldDescription>
		</Field>
	),
}
