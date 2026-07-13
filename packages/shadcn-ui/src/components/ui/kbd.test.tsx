import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Kbd, KbdGroup } from '~/components/ui/kbd'

describe('Kbd', () => {
	it('renders as a <kbd> with data-slot="kbd"', () => {
		render(<Kbd>⌘</Kbd>)
		const el = document.querySelector('[data-slot="kbd"]')
		expect(el?.tagName).toBe('KBD')
		expect(el).toHaveTextContent('⌘')
	})

	it('KbdGroup renders with data-slot="kbd-group"', () => {
		render(
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
		)
		expect(document.querySelector('[data-slot="kbd-group"]')).toBeInTheDocument()
	})
})
