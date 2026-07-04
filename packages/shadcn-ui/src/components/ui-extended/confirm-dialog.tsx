'use client'

import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import type { buttonVariants } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'

interface ConfirmDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	title?: React.ReactNode
	description?: React.ReactNode
	confirmLabel?: string
	cancelLabel?: string
	confirmVariant?: VariantProps<typeof buttonVariants>['variant']
	loading?: boolean
	onConfirm: () => void
	onCancel?: () => void
}

function ConfirmDialog({
	open,
	onOpenChange,
	title = 'Are you sure?',
	description,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	confirmVariant = 'default',
	loading = false,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	function handleCancel() {
		onCancel?.()
		onOpenChange(false)
	}

	function handleConfirm() {
		onConfirm()
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel} disabled={loading}>
						{cancelLabel}
					</AlertDialogCancel>
					<AlertDialogAction variant={confirmVariant} onClick={handleConfirm} disabled={loading}>
						{loading && <Spinner className="mr-2" />}
						{confirmLabel}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
