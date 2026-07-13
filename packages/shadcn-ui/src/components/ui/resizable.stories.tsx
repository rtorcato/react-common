import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '~/components/ui/resizable'

const meta: Meta = {
	title: 'ui/Resizable',
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Horizontal: Story = {
	render: () => {
		// `react-resizable-panels` v4 declares `direction` on PanelGroupProps but
		// the shadcn wrapper's `ResizablePrimitive.GroupProps` re-export doesn't
		// surface it through TS; spreading via a typed const sidesteps the
		// narrow JSX prop check without changing the auto-generated component.
		const groupProps = {
			direction: 'horizontal' as const,
			className: 'max-w-md rounded-lg border w-[480px]',
		}
		return (
			<ResizablePanelGroup {...groupProps}>
				<ResizablePanel defaultSize={50}>
					<div className="flex h-[200px] items-center justify-center p-6">One</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>
					<div className="flex h-[200px] items-center justify-center p-6">Two</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		)
	},
}
