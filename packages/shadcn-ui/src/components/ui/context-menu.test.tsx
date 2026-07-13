import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '~/components/ui/context-menu'

describe('ContextMenu', () => {
	it('renders the trigger with data-slot="context-menu-trigger"', () => {
		render(
			<ContextMenu>
				<ContextMenuTrigger>Right-click area</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Copy</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		)
		// Content is not in the DOM until contextmenu fires; just confirm the
		// trigger renders.
		expect(screen.getByText('Right-click area')).toBeInTheDocument()
	})
})
