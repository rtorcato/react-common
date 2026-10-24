import * as React from 'react'

/**
 * `false` on the server and on the first client render, `true` after mount.
 * Use it to defer browser-only values (a stored theme, the viewer's timezone)
 * so the first client render matches the server HTML and hydration stays clean.
 *
 * @example
 * const mounted = useHasMounted()
 * return <span>{mounted ? theme : null}</span>
 */
export function useHasMounted(): boolean {
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => setMounted(true), [])

	return mounted
}
