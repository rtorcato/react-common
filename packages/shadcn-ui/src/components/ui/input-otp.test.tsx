import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '~/components/ui/input-otp'

// input-otp schedules a delayed selection sync via setTimeout that fires after
// the jsdom environment is torn down; fake timers swallow it cleanly.
describe('InputOTP', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('renders the requested number of slots', () => {
		render(
			<InputOTP maxLength={4}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		)

		expect(document.querySelectorAll('[data-slot="input-otp-slot"]')).toHaveLength(4)
		expect(document.querySelector('[data-slot="input-otp-group"]')).toBeInTheDocument()
	})
})
