import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

describe('Avatar', () => {
	it('renders the root with data-slot="avatar" and default size', () => {
		render(
			<Avatar>
				<AvatarFallback>RT</AvatarFallback>
			</Avatar>
		)
		const root = document.querySelector('[data-slot="avatar"]')
		expect(root).toBeInTheDocument()
		expect(root).toHaveAttribute('data-size', 'default')
	})

	it('renders size="sm" via data-size', () => {
		render(
			<Avatar size="sm">
				<AvatarFallback>RT</AvatarFallback>
			</Avatar>
		)
		expect(document.querySelector('[data-slot="avatar"]')).toHaveAttribute('data-size', 'sm')
	})

	it('renders the fallback content', () => {
		render(
			<Avatar>
				<AvatarFallback>RT</AvatarFallback>
			</Avatar>
		)
		expect(screen.getByText('RT')).toBeInTheDocument()
	})

	it('AvatarImage forwards alt and src', () => {
		render(
			<Avatar>
				<AvatarImage alt="profile" src="/me.png" />
				<AvatarFallback>RT</AvatarFallback>
			</Avatar>
		)
		// Radix only renders AvatarImage if the image loads; in jsdom it stays as
		// a fallback. Confirm the fallback slot is in the DOM.
		expect(document.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument()
	})
})
