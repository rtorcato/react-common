import type { Meta, StoryObj } from '@storybook/react-vite'

import { CopyButton } from '~/components/ui-extended/copy-button'

const meta = {
	title: 'ui-extended/CopyButton',
	component: CopyButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { value: 'pnpm add @rtorcato/shadcn-ui' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
	args: { showLabel: true },
}

export const Ghost: Story = {
	args: { variant: 'ghost' },
}

export const Disabled: Story = {
	args: { disabled: true },
}

export const InCodeBlock: Story = {
	render: (args) => (
		<div className="flex items-center gap-2 rounded-md bg-muted py-1 pr-1 pl-3 font-mono text-sm">
			<code>{args.value}</code>
			<CopyButton {...args} variant="ghost" size="icon-sm" />
		</div>
	),
}
