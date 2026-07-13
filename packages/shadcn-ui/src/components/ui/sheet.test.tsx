import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/components/ui/sheet'

describe('Sheet', () => {
	it('opens when the trigger is clicked', async () => {
		const user = userEvent.setup()
		render(
			<Sheet>
				<SheetTrigger>Open sheet</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		)

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		await user.click(screen.getByText('Open sheet'))
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		expect(screen.getByText('Title')).toBeInTheDocument()
	})
})
