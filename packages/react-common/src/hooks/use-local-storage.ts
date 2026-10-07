import * as React from 'react'

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
	// Start from initialValue and read storage after mount, so the first client
	// render matches the server render (no hydration mismatch, #184).
	const [storedValue, setStoredValue] = React.useState<T>(initialValue)

	React.useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) setStoredValue(JSON.parse(item) as T)
		} catch {
			// localStorage unavailable or stored JSON invalid: keep initialValue
		}
	}, [key])

	const setValue = React.useCallback(
		(value: T | ((prev: T) => T)) => {
			setStoredValue((prev) => {
				const next = value instanceof Function ? value(prev) : value
				try {
					window.localStorage.setItem(key, JSON.stringify(next))
				} catch {
					// localStorage unavailable (SSR, private mode quota exceeded)
				}
				return next
			})
		},
		[key]
	)

	return [storedValue, setValue]
}
