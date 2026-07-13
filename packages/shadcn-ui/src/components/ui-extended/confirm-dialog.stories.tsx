import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { ConfirmDialog } from '~/components/ui-extended/confirm-dialog'

const meta = {
	title: 'ui-extended/ConfirmDialog',
	component: ConfirmDialog,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open confirm</Button>
				<ConfirmDialog
					{...args}
					open={open}
					onOpenChange={setOpen}
					onConfirm={() => setOpen(false)}
				/>
			</>
		)
	},
	args: {
		title: 'Delete this item?',
		description: 'This action cannot be undone.',
		confirmLabel: 'Delete',
		confirmVariant: 'destructive',
		open: false,
		onOpenChange: () => {},
		onConfirm: () => {},
	},
}

export const Loading: Story = {
	args: {
		open: true,
		loading: true,
		title: 'Saving changes…',
		description: 'Please wait while we save your changes.',
		confirmLabel: 'Save',
		onOpenChange: () => {},
		onConfirm: () => {},
	},
}
