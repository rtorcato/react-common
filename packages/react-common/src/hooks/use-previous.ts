import * as React from 'react'

/**
 * Returns the value from the previous render. On the first render it returns
 * `undefined`, since there is no prior value yet.
 *
 * @example
 * const prevCount = usePrevious(count)
 */
export function usePrevious<T>(value: T): T | undefined {
	const ref = React.useRef<T | undefined>(undefined)

	React.useEffect(() => {
		ref.current = value
	}, [value])

	return ref.current
}
