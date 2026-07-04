import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'

describe('Card', () => {
	it('renders all sub-components with their data-slot attributes', () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
					<CardDescription>Description</CardDescription>
					<CardAction>Action</CardAction>
				</CardHeader>
				<CardContent>Content</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>
		)

		expect(document.querySelector('[data-slot="card"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="card-header"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="card-title"]')).toHaveTextContent('Title')
		expect(document.querySelector('[data-slot="card-description"]')).toHaveTextContent(
			'Description'
		)
		expect(document.querySelector('[data-slot="card-action"]')).toHaveTextContent('Action')
		expect(document.querySelector('[data-slot="card-content"]')).toHaveTextContent('Content')
		expect(document.querySelector('[data-slot="card-footer"]')).toHaveTextContent('Footer')
	})

	it('forwards a custom className on the root Card', () => {
		render(<Card className="custom-class">body</Card>)
		expect(screen.getByText('body')).toHaveClass('custom-class')
	})
})
