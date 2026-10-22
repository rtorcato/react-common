import {
	getLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from '@rtorcato/browser-common/localstorage'
import * as React from 'react'

// getLocalStorage returns the raw string when JSON.parse fails. A real stored
// string is JSON-quoted, so a returned string equal to the raw entry means the
// parse failed. ponytail: reads window directly; drop once browser-common can
// signal parse failure itself.
function isRawString(key: string, item: unknown): boolean {
	return typeof item === 'string' && window.localStorage.getItem(key) === item
}

/**
 * State persisted to `localStorage` as JSON. The first render uses `initialValue`
 * and storage is read after mount, so it matches the server render.
 *
 * `isValid` guards the stored value: when it returns false (stale schema,
 * hand-edited entry) the stored value is ignored and `initialValue` is kept.
 * Without it, a stored value is kept only if its `typeof` (and array-ness)
 * matches `initialValue`, which rejects the raw string `getLocalStorage` returns
 * for an entry that isn't valid JSON. The check is skipped when `initialValue` is
 * `null` or `undefined`; for union types, pass `isValid`.
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
		const initial = initialRef.current
		const ok = validate
			? validate(item)
			: initial == null ||
				(typeof item === typeof initial &&
					Array.isArray(item) === Array.isArray(initial) &&
					!isRawString(key, item))
		if (ok) setStoredValue(item as T)
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
