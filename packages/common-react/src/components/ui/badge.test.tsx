import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '~/components/ui/badge'

describe('Badge', () => {
	it('renders a span with data-slot="badge" and default variant', () => {
		render(<Badge>New</Badge>)
		const badge = screen.getByText('New')
		expect(badge.tagName).toBe('SPAN')
		expect(badge).toHaveAttribute('data-slot', 'badge')
		expect(badge).toHaveAttribute('data-variant', 'default')
	})

	it('applies a custom variant via data-variant', () => {
		render(<Badge variant="destructive">Error</Badge>)
		expect(screen.getByText('Error')).toHaveAttribute('data-variant', 'destructive')
	})

	it('renders as an anchor when asChild is used with an <a>', () => {
		render(
			<Badge asChild>
				<a href="/profile">Profile</a>
			</Badge>
		)
		const el = screen.getByRole('link', { name: 'Profile' })
		expect(el.tagName).toBe('A')
		expect(el).toHaveAttribute('data-slot', 'badge')
	})

	it('merges a custom className', () => {
		render(<Badge className="custom-class">Tag</Badge>)
		expect(screen.getByText('Tag')).toHaveClass('custom-class')
	})
})
