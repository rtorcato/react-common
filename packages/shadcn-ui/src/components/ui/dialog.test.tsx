import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, it } from 'vitest'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'

// Helper: a dialog with a trigger button
function TestDialog({
	showCloseButton = true,
	children,
}: {
	showCloseButton?: boolean
	children?: React.ReactNode
}) {
	return (
		<Dialog>
			<DialogTrigger>Open dialog</DialogTrigger>
			<DialogContent showCloseButton={showCloseButton}>
				<DialogHeader>
					<DialogTitle>Dialog title</DialogTitle>
					<DialogDescription>Dialog description</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>Footer content</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

describe('Dialog', () => {
	it('DialogTrigger button opens the dialog and renders DialogContent in the DOM', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

		await user.click(screen.getByText('Open dialog'))

		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})

	it('DialogContent shows its children when open', async () => {
		const user = userEvent.setup()
		render(<TestDialog>Secret content</TestDialog>)

		await user.click(screen.getByText('Open dialog'))

		expect(screen.getByText('Secret content')).toBeVisible()
	})

	it('close button (XIcon) closes the dialog when clicked', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)

		await user.click(screen.getByText('Open dialog'))
		expect(screen.getByRole('dialog')).toBeInTheDocument()

		// The close button has an sr-only "Close" label inside
		const closeBtn = screen.getByRole('button', { name: /close/i })
		await user.click(closeBtn)

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('hides the close button when showCloseButton={false}', async () => {
		const user = userEvent.setup()
		render(<TestDialog showCloseButton={false} />)

		await user.click(screen.getByText('Open dialog'))

		expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
	})
})

describe('Dialog sub-components data-slot attributes', () => {
	it('DialogHeader renders with data-slot="dialog-header"', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)
		await user.click(screen.getByText('Open dialog'))

		const header = document.querySelector('[data-slot="dialog-header"]')
		expect(header).toBeInTheDocument()
	})

	it('DialogFooter renders with data-slot="dialog-footer"', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)
		await user.click(screen.getByText('Open dialog'))

		const footer = document.querySelector('[data-slot="dialog-footer"]')
		expect(footer).toBeInTheDocument()
	})

	it('DialogTitle renders with data-slot="dialog-title"', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)
		await user.click(screen.getByText('Open dialog'))

		const title = document.querySelector('[data-slot="dialog-title"]')
		expect(title).toBeInTheDocument()
		expect(title).toHaveTextContent('Dialog title')
	})

	it('DialogDescription renders with data-slot="dialog-description"', async () => {
		const user = userEvent.setup()
		render(<TestDialog />)
		await user.click(screen.getByText('Open dialog'))

		const desc = document.querySelector('[data-slot="dialog-description"]')
		expect(desc).toBeInTheDocument()
		expect(desc).toHaveTextContent('Dialog description')
	})
})
