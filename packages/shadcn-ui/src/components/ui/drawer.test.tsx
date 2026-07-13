import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/components/ui/drawer'

describe('Drawer', () => {
	it('renders the trigger with data-slot="drawer-trigger"', () => {
		render(
			<Drawer>
				<DrawerTrigger>Open drawer</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Title</DrawerTitle>
						<DrawerDescription>Description</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		)
		expect(screen.getByText('Open drawer')).toHaveAttribute('data-slot', 'drawer-trigger')
	})
})
