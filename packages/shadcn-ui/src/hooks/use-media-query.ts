import * as React from 'react'

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = React.useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return window.matchMedia(query).matches
	})

	React.useEffect(() => {
		const mql = window.matchMedia(query)
		const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
		mql.addEventListener('change', onChange)
		setMatches(mql.matches)
		return () => mql.removeEventListener('change', onChange)
	}, [query])

	return matches
}
