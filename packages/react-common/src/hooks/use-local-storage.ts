import * as React from 'react'

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = React.useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch {
			return initialValue
		}
	})

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
