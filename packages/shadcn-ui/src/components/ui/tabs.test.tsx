import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

function TestTabs() {
	return (
		<Tabs defaultValue="account">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">account panel</TabsContent>
			<TabsContent value="password">password panel</TabsContent>
		</Tabs>
	)
}

describe('Tabs', () => {
	it('renders triggers with role="tab" and the active panel', () => {
		render(<TestTabs />)

		expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument()
		expect(screen.getByRole('tab', { name: 'Password' })).toBeInTheDocument()
		expect(screen.getByText('account panel')).toBeVisible()
	})

	it('marks the defaultValue tab as active', () => {
		render(<TestTabs />)
		expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'active')
		expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
			'data-state',
			'inactive'
		)
	})

	it('switches the active panel when a different tab is clicked', async () => {
		const user = userEvent.setup()
		render(<TestTabs />)

		await user.click(screen.getByRole('tab', { name: 'Password' }))

		expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
			'data-state',
			'active'
		)
		expect(screen.getByText('password panel')).toBeVisible()
	})

	it('TabsList renders with data-variant="default" by default', () => {
		render(<TestTabs />)
		expect(screen.getByRole('tablist')).toHaveAttribute('data-variant', 'default')
	})
})
