import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'

function TestAlertDialog({ onAction }: { onAction?: () => void }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>Open</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Title</AlertDialogTitle>
					<AlertDialogDescription>Description</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

describe('AlertDialog', () => {
	it('opens when the trigger is clicked', async () => {
		const user = userEvent.setup()
		render(<TestAlertDialog />)

		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		await user.click(screen.getByText('Open'))
		expect(screen.getByRole('alertdialog')).toBeInTheDocument()
	})

	it('calls the action handler when Confirm is clicked', async () => {
		const user = userEvent.setup()
		const onAction = vi.fn()
		render(<TestAlertDialog onAction={onAction} />)

		await user.click(screen.getByText('Open'))
		await user.click(screen.getByRole('button', { name: 'Confirm' }))

		expect(onAction).toHaveBeenCalledTimes(1)
	})
})
