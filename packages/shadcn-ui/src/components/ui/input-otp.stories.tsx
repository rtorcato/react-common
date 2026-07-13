import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '~/components/ui/input-otp'

const meta: Meta<typeof InputOTP> = {
	title: 'ui/InputOTP',
	component: InputOTP,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const Default: Story = {
	render: () => (
		<InputOTP maxLength={6}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	),
}
