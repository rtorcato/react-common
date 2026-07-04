import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '~/components/ui/collapsible'

describe('Collapsible', () => {
	it('toggles aria-expanded on the trigger when clicked', async () => {
		const user = userEvent.setup()
		render(
			<Collapsible>
				<CollapsibleTrigger>Toggle</CollapsibleTrigger>
				<CollapsibleContent>Hidden content</CollapsibleContent>
			</Collapsible>
		)

		const trigger = screen.getByRole('button', { name: 'Toggle' })
		expect(trigger).toHaveAttribute('aria-expanded', 'false')

		await user.click(trigger)
		expect(trigger).toHaveAttribute('aria-expanded', 'true')
	})
})
