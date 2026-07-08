import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Toaster } from '~/components/ui/sonner'

const meta: Meta<typeof Toaster> = {
	title: 'ui/Sonner',
	component: Toaster,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
	render: () => (
		<div className="flex flex-col items-center gap-3">
			<Button
				variant="outline"
				onClick={() =>
					toast('Event has been created', {
						description: 'Sunday, December 03, 2023 at 9:00 AM',
					})
				}
			>
				Show toast
			</Button>
			<Toaster />
		</div>
	),
}
