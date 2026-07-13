import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'

describe('NavigationMenu', () => {
	it('renders the root + list with data-slot attributes', () => {
		render(
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Products</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink href="/a">Item A</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		)
		expect(document.querySelector('[data-slot="navigation-menu"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="navigation-menu-list"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="navigation-menu-trigger"]')).toBeInTheDocument()
	})
})
