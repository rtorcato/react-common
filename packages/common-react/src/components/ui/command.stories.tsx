import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar, Smile, User } from 'lucide-react'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '~/components/ui/command'

const meta: Meta<typeof Command> = {
	title: 'ui/Command',
	component: Command,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
	render: () => (
		<Command className="rounded-lg border shadow-md w-[420px]">
			<CommandInput placeholder="Type a command or search…" />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<Calendar className="mr-2 h-4 w-4" />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<Smile className="mr-2 h-4 w-4" />
						<span>Search Emoji</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	),
}
