import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd, KbdGroup } from '~/components/ui/kbd'

const meta: Meta<typeof Kbd> = {
	title: 'ui/Kbd',
	component: Kbd,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Single: Story = {
	render: () => <Kbd>⌘</Kbd>,
}

export const Combination: Story = {
	render: () => (
		<KbdGroup>
			<Kbd>⌘</Kbd>
			<Kbd>K</Kbd>
		</KbdGroup>
	),
}
