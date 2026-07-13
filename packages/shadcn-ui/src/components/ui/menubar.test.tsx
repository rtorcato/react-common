import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '~/components/ui/menubar'

describe('Menubar', () => {
	it('renders menus and triggers', () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		)
		expect(document.querySelector('[data-slot="menubar"]')).toBeInTheDocument()
		expect(screen.getByText('File')).toHaveAttribute('data-slot', 'menubar-trigger')
		expect(screen.getByText('Edit')).toHaveAttribute('data-slot', 'menubar-trigger')
	})
})
