import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

describe('DropdownMenu', () => {
	it('opens content when the trigger is clicked', async () => {
		const user = userEvent.setup()
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)

		expect(screen.queryByText('Profile')).not.toBeInTheDocument()
		await user.click(screen.getByText('Open menu'))
		expect(await screen.findByText('Profile')).toBeInTheDocument()
		expect(screen.getByText('Settings')).toBeInTheDocument()
	})
})
