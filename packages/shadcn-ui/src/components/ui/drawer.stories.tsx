import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/components/ui/drawer'

const meta: Meta<typeof Drawer> = {
	title: 'ui/Drawer',
	component: Drawer,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">Open drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Move goal</DrawerTitle>
						<DrawerDescription>Set your daily activity goal.</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<Button variant="outline">Cancel</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	),
}
