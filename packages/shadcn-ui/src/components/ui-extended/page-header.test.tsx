import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageHeader } from '~/components/ui-extended/page-header'

describe('PageHeader', () => {
	it('renders the title as an h1', () => {
		render(<PageHeader title="Dashboard" />)
		const heading = screen.getByRole('heading', { level: 1 })
		expect(heading).toHaveTextContent('Dashboard')
	})

	it('renders the description when provided', () => {
		render(<PageHeader title="Dashboard" description="An overview of your account." />)
		expect(screen.getByText('An overview of your account.')).toBeInTheDocument()
	})

	it('does not render a description paragraph when omitted', () => {
		render(<PageHeader title="Dashboard" />)
		// No <p> tags inside the header
		const container = document.querySelector('[data-slot="page-header"]')
		expect(container?.querySelector('p')).toBeNull()
	})

	it('renders breadcrumbs with intermediate links and the last item as the current page', () => {
		render(
			<PageHeader
				title="Settings"
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Account', href: '/account' },
					{ label: 'Settings' },
				]}
			/>
		)

		const homeLink = screen.getByRole('link', { name: 'Home' })
		expect(homeLink.tagName).toBe('A')
		expect(homeLink).toHaveAttribute('href', '/')

		const accountLink = screen.getByRole('link', { name: 'Account' })
		expect(accountLink.tagName).toBe('A')
		expect(accountLink).toHaveAttribute('href', '/account')

		// Last crumb is rendered as BreadcrumbPage (a span with aria-current="page",
		// not an anchor)
		const settingsBreadcrumb = screen.getByText('Settings', {
			selector: '[data-slot="breadcrumb-page"]',
		})
		expect(settingsBreadcrumb).toHaveAttribute('aria-current', 'page')
		expect(settingsBreadcrumb.tagName).toBe('SPAN')
	})

	it('does not render a breadcrumb bar when breadcrumbs is empty', () => {
		render(<PageHeader title="Dashboard" breadcrumbs={[]} />)
		expect(screen.queryByRole('navigation')).toBeNull()
	})

	it('renders actions in the actions slot', () => {
		render(<PageHeader title="Dashboard" actions={<button type="button">Create</button>} />)
		expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
	})
})
