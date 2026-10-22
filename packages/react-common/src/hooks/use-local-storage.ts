import {
	getLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from '@rtorcato/browser-common/localstorage'
import * as React from 'react'

/**
 * State persisted to `localStorage` as JSON. The first render uses `initialValue`
 * and storage is read after mount, so it matches the server render.
 *
 * `isValid` guards the stored value: when it returns false (stale schema,
 * hand-edited entry) the stored value is ignored and `initialValue` is kept.
 * Without it, whatever `getLocalStorage` returns is trusted, which includes the
 * raw string for an entry that isn't valid JSON.
 *
 * The third tuple item removes the entry and resets to `initialValue`.
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T,
	isValid?: (value: unknown) => value is T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
	// Start from initialValue and read storage after mount, so the first client
	// render matches the server render (no hydration mismatch, #184).
	const [storedValue, setStoredValue] = React.useState<T>(initialValue)
	const initialRef = React.useRef(initialValue)
	const isValidRef = React.useRef(isValid)
	initialRef.current = initialValue
	isValidRef.current = isValid

	React.useEffect(() => {
		const item = getLocalStorage(key)
		if (item === null) return
		const validate = isValidRef.current
		if (!validate || validate(item)) setStoredValue(item as T)
	}, [key])

	const setValue = React.useCallback(
		(value: T | ((prev: T) => T)) => {
			setStoredValue((prev) => {
				const next = value instanceof Function ? value(prev) : value
				try {
					setLocalStorage(key, next)
				} catch {
					// quota exceeded: keep the in-memory state anyway
				}
				return next
			})
		},
		[key]
	)

	const clear = React.useCallback(() => {
		removeLocalStorage(key)
		setStoredValue(initialRef.current)
	}, [key])

	return [storedValue, setValue, clear]
}
