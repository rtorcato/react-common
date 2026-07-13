import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '~/components/ui/hover-card'

describe('HoverCard', () => {
	it('renders the trigger with data-slot="hover-card-trigger"', () => {
		render(
			<HoverCard>
				<HoverCardTrigger>Hover</HoverCardTrigger>
				<HoverCardContent>Card content</HoverCardContent>
			</HoverCard>
		)
		expect(screen.getByText('Hover')).toHaveAttribute('data-slot', 'hover-card-trigger')
	})

	it('renders content when forced open via controlled prop', () => {
		render(
			<HoverCard open>
				<HoverCardTrigger>Hover</HoverCardTrigger>
				<HoverCardContent>Card content</HoverCardContent>
			</HoverCard>
		)
		expect(screen.getByText('Card content')).toBeInTheDocument()
	})
})
