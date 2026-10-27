'use client'

import { useCopy } from '@rtorcato/react-common'
import { Check, CircleAlert, Copy } from 'lucide-react'
import * as React from 'react'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

interface CopyButtonProps
	extends Omit<React.ComponentProps<typeof Button>, 'value' | 'children' | 'onClick' | 'onCopy'> {
	/** Text written to the clipboard. */
	value: string
	/** Idle label: the aria-label and tooltip (icon-only), or the visible text (`showLabel`). */
	label?: string
	copiedLabel?: string
	failedLabel?: string
	/** Show the label as text beside the icon instead of in a tooltip. */
	showLabel?: boolean
	/** ms before returning to idle; passed straight to `useCopy`. */
	timeout?: number
	/** Fires after each attempt with the result. */
	onCopy?: (ok: boolean) => void
}

const ICONS = { idle: Copy, copied: Check, failed: CircleAlert }

/**
 * A button that copies `value` to the clipboard. Icon-only with a tooltip by
 * default, or labelled with `showLabel`. Shows a copied or failed state for
 * `timeout` ms and announces it through a polite status region.
 */
function CopyButton({
	value,
	label = 'Copy',
	copiedLabel = 'Copied',
	failedLabel = "Couldn't copy",
	showLabel = false,
	timeout = 2000,
	onCopy,
	variant = 'outline',
	size = showLabel ? 'default' : 'icon',
	disabled,
	className,
	...props
}: CopyButtonProps) {
	const { copy, copied, failed } = useCopy(timeout)
	const [hovered, setHovered] = React.useState(false)
	const state = copied ? 'copied' : failed ? 'failed' : 'idle'
	const labels = { idle: label, copied: copiedLabel, failed: failedLabel }
	const current = labels[state]
	const Icon = ICONS[state]

	const button = (
		<Button
			type="button"
			variant={variant}
			size={size}
			disabled={disabled}
			aria-label={showLabel ? undefined : label}
			className={cn(
				!showLabel && "relative after:absolute after:-inset-1 after:content-['']",
				className
			)}
			onClick={async (event) => {
				// Radix closes the tooltip on click; keep it open to show the result.
				event.preventDefault()
				const ok = await copy(value)
				onCopy?.(ok)
			}}
			{...props}
		>
			<Icon
				key={state}
				aria-hidden
				data-state={state}
				className="animate-in fade-in zoom-in-75 duration-150 motion-reduce:animate-none"
			/>
			{showLabel && (
				<span className="grid">
					{Object.entries(labels).map(([key, text]) => (
						<span
							key={key}
							className={cn('col-start-1 row-start-1', key !== state && 'invisible')}
							aria-hidden={key !== state}
						>
							{text}
						</span>
					))}
				</span>
			)}
		</Button>
	)

	return (
		<>
			{showLabel || disabled ? (
				button
			) : (
				<TooltipProvider>
					<Tooltip open={hovered || state !== 'idle'} onOpenChange={setHovered}>
						<TooltipTrigger asChild>{button}</TooltipTrigger>
						<TooltipContent>{current}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
			<span role="status" className="sr-only">
				{state === 'idle' ? '' : current}
			</span>
		</>
	)
}

export { CopyButton }
export type { CopyButtonProps }
