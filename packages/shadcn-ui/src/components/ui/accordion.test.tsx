import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '~/components/ui/accordion'

function TestAccordion() {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="a">
				<AccordionTrigger>First</AccordionTrigger>
				<AccordionContent>First content</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>Second</AccordionTrigger>
				<AccordionContent>Second content</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

describe('Accordion', () => {
	it('renders triggers as buttons', () => {
		render(<TestAccordion />)
		expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument()
	})

	it('expands a section when its trigger is clicked', async () => {
		const user = userEvent.setup()
		render(<TestAccordion />)

		const trigger = screen.getByRole('button', { name: 'First' })
		expect(trigger).toHaveAttribute('aria-expanded', 'false')

		await user.click(trigger)
		expect(trigger).toHaveAttribute('aria-expanded', 'true')
	})
})
