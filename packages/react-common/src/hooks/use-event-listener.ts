import * as React from 'react'

type MaybeRef<T> = T | React.RefObject<T | null>

/**
 * Attach an event listener with automatic cleanup. Defaults to `window`; pass a
 * `Document`, an `HTMLElement`, or a ref to one as the target. The handler is
 * kept in a ref so updating it never re-attaches the listener.
 */
export function useEventListener<K extends keyof WindowEventMap>(
	eventName: K,
	handler: (event: WindowEventMap[K]) => void,
	target?: Window
): void
export function useEventListener<K extends keyof DocumentEventMap>(
	eventName: K,
	handler: (event: DocumentEventMap[K]) => void,
	target: Document
): void
export function useEventListener<K extends keyof HTMLElementEventMap>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	target: MaybeRef<HTMLElement>
): void
export function useEventListener(
	eventName: string,
	handler: (event: Event) => void,
	target?: MaybeRef<Window | Document | HTMLElement>
): void {
	const savedHandler = React.useRef(handler)

	React.useEffect(() => {
		savedHandler.current = handler
	}, [handler])

	React.useEffect(() => {
		const element =
			target == null ? window : target instanceof EventTarget ? target : target.current
		if (!element) return

		const listener = (event: Event) => savedHandler.current(event)
		element.addEventListener(eventName, listener)
		return () => element.removeEventListener(eventName, listener)
	}, [eventName, target])
}
