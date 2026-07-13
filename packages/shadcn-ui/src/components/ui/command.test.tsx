import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command'

describe('Command', () => {
	it('renders the input, list, and items', () => {
		render(
			<Command>
				<CommandInput placeholder="Search…" />
				<CommandList>
					<CommandEmpty>No results</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Profile</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		)

		expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
		expect(screen.getByText('Profile')).toBeInTheDocument()
		expect(screen.getByText('Settings')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument()
	})
})
