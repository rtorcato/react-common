import * as React from 'react'

/**
 * Declarative `setInterval`. The latest `callback` is always called without
 * resetting the timer, and passing `delay: null` pauses it. Solves the
 * stale-closure problem of using `setInterval` directly in an effect.
 */
export function useInterval(callback: () => void, delay: number | null): void {
	const savedCallback = React.useRef(callback)

	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	React.useEffect(() => {
		if (delay === null) return
		const id = setInterval(() => savedCallback.current(), delay)
		return () => clearInterval(id)
	}, [delay])
}
