import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '~/components/ui/resizable'

describe('Resizable', () => {
	it('renders the panel group with data-slot="resizable-panel-group"', () => {
		render(
			<ResizablePanelGroup orientation="horizontal">
				<ResizablePanel>left</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>right</ResizablePanel>
			</ResizablePanelGroup>
		)
		expect(
			document.querySelector('[data-slot="resizable-panel-group"]')
		).toBeInTheDocument()
		expect(document.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument()
	})
})
