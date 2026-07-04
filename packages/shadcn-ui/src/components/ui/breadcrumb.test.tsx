import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

describe('Breadcrumb', () => {
	it('renders as <nav aria-label="breadcrumb">', () => {
		render(
			<Breadcrumb>
				<BreadcrumbList />
			</Breadcrumb>
		)
		const nav = screen.getByRole('navigation', { name: /breadcrumb/i })
		expect(nav).toHaveAttribute('data-slot', 'breadcrumb')
	})

	it('renders link items as anchors', () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Current</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		)
		const link = screen.getByRole('link', { name: 'Home' })
		expect(link).toHaveAttribute('href', '/')
		expect(document.querySelector('[data-slot="breadcrumb-page"]')).toHaveTextContent('Current')
	})
})
