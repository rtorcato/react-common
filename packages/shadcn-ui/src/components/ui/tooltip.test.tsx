import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/components/ui/tooltip'

function TestTooltip() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>Hover me</TooltipTrigger>
				<TooltipContent>Helpful hint</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

describe('Tooltip', () => {
	it('renders the trigger with data-slot="tooltip-trigger"', () => {
		render(<TestTooltip />)
		expect(screen.getByText('Hover me')).toHaveAttribute('data-slot', 'tooltip-trigger')
	})

	it('does not render the tooltip content before activation', () => {
		render(<TestTooltip />)
		expect(screen.queryByText('Helpful hint')).not.toBeInTheDocument()
	})

	it('renders content when the Tooltip is forced open via the controlled prop', () => {
		render(
			<TooltipProvider>
				<Tooltip open>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Helpful hint</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		// When forced open, Radix renders the content in a portal
		expect(screen.getAllByText('Helpful hint').length).toBeGreaterThan(0)
	})
})
