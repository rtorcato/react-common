import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '~/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/components/ui/sheet'

const meta: Meta<typeof Sheet> = {
	title: 'ui/Sheet',
	component: Sheet,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

const renderSheet = (side: 'top' | 'right' | 'bottom' | 'left') => (
	<Sheet>
		<SheetTrigger asChild>
			<Button variant="outline">Open {side} sheet</Button>
		</SheetTrigger>
		<SheetContent side={side}>
			<SheetHeader>
				<SheetTitle>Edit profile</SheetTitle>
				<SheetDescription>
					Make changes to your profile here. Click save when you're done.
				</SheetDescription>
			</SheetHeader>
			<SheetFooter>
				<Button>Save changes</Button>
			</SheetFooter>
		</SheetContent>
	</Sheet>
)

export const Right: Story = { render: () => renderSheet('right') }
export const Left: Story = { render: () => renderSheet('left') }
export const Top: Story = { render: () => renderSheet('top') }
export const Bottom: Story = { render: () => renderSheet('bottom') }
