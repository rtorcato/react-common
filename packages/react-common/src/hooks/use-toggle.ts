import * as React from 'react'

export interface UseToggleResult {
	/** The current boolean value. */
	value: boolean
	/** Flip the value, or set it explicitly when passed a boolean. */
	toggle: (next?: boolean) => void
	/** Set the value to `true`. */
	setOn: () => void
	/** Set the value to `false`. */
	setOff: () => void
}

/**
 * Boolean state with stable toggle/set helpers — the common
 * open/closed, on/off pattern.
 *
 * @example
 * const { value: isOpen, toggle, setOff } = useToggle()
 */
export function useToggle(initialValue = false): UseToggleResult {
	const [value, setValue] = React.useState(initialValue)

	const toggle = React.useCallback((next?: boolean) => {
		setValue((current) => (typeof next === 'boolean' ? next : !current))
	}, [])

	const setOn = React.useCallback(() => setValue(true), [])
	const setOff = React.useCallback(() => setValue(false), [])

	return { value, toggle, setOn, setOff }
}
