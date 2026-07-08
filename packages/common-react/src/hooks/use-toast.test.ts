import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { reducer, toast, useToast } from '~/hooks/use-toast'

// ---------------------------------------------------------------------------
// Pure reducer tests — these do not touch module-level state
// ---------------------------------------------------------------------------
describe('reducer', () => {
	const emptyState = { toasts: [] }

	const baseToast = {
		id: '1',
		title: 'Hello',
	}

	it('ADD_TOAST adds a toast to state', () => {
		const next = reducer(emptyState, { type: 'ADD_TOAST', toast: baseToast })
		expect(next.toasts).toHaveLength(1)
		expect(next.toasts[0]).toMatchObject(baseToast)
	})

	it('ADD_TOAST respects TOAST_LIMIT (1) by dropping older toasts', () => {
		const stateWithOne = reducer(emptyState, {
			type: 'ADD_TOAST',
			toast: { id: '1', title: 'First' },
		})
		const stateWithTwo = reducer(stateWithOne, {
			type: 'ADD_TOAST',
			toast: { id: '2', title: 'Second' },
		})
		// TOAST_LIMIT is 1 — only the newest toast survives
		expect(stateWithTwo.toasts).toHaveLength(1)
		expect(stateWithTwo.toasts[0].id).toBe('2')
	})

	it('REMOVE_TOAST with a specific id removes that toast', () => {
		const state = { toasts: [baseToast] }
		const next = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' })
		expect(next.toasts).toHaveLength(0)
	})

	it('REMOVE_TOAST without a toastId clears all toasts', () => {
		const state = {
			toasts: [
				{ id: '1', title: 'A' },
				{ id: '2', title: 'B' },
			],
		}
		const next = reducer(state, { type: 'REMOVE_TOAST' })
		expect(next.toasts).toHaveLength(0)
	})

	it('UPDATE_TOAST updates the matching toast', () => {
		const state = { toasts: [baseToast] }
		const next = reducer(state, {
			type: 'UPDATE_TOAST',
			toast: { id: '1', title: 'Updated' },
		})
		expect(next.toasts[0].title).toBe('Updated')
	})

	it('UPDATE_TOAST leaves non-matching toasts unchanged', () => {
		const state = {
			toasts: [
				{ id: '1', title: 'First' },
				{ id: '2', title: 'Second' },
			],
		}
		const next = reducer(state, {
			type: 'UPDATE_TOAST',
			toast: { id: '1', title: 'Changed' },
		})
		expect(next.toasts[1].title).toBe('Second')
	})

	it('DISMISS_TOAST sets open: false on the matching toast', () => {
		const state = { toasts: [{ ...baseToast, open: true }] }
		const next = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' })
		expect(next.toasts[0].open).toBe(false)
	})

	it('DISMISS_TOAST without toastId dismisses all toasts', () => {
		const state = {
			toasts: [
				{ id: '1', open: true },
				{ id: '2', open: true },
			],
		}
		const next = reducer(state, { type: 'DISMISS_TOAST' })
		expect(next.toasts.every((t) => t.open === false)).toBe(true)
	})
})

// ---------------------------------------------------------------------------
// Integration tests — use module-level dispatch via toast() / useToast()
//
// Reset module-level state before and after each test by dispatching
// REMOVE_TOAST (no toastId → clears all).
// ---------------------------------------------------------------------------

// Import dispatch indirectly by calling toast() and useToast(), both of
// which call the module-level dispatch function.  We reset by calling
// the dismiss helper from useToast (which calls DISMISS_TOAST) followed
// by allowing the REMOVE_TOAST timeout, OR by simply invoking toast()
// state cleanup via a dedicated reset hook call.
//
// The cleanest reset is: renderHook useToast, grab dismiss, call it, then
// call dispatch REMOVE_TOAST via toast's internal dispatch.  Since we
// cannot reach dispatch directly, we test in isolation per describe block
// and use a fresh renderHook per test.

describe('toast() function and useToast hook integration', () => {
	// Reset module-level state before each test
	beforeEach(() => {
		// Render a hook instance purely to drive the dispatch call for cleanup
		const { result, unmount } = renderHook(() => useToast())
		act(() => {
			result.current.dismiss()
		})
		unmount()
		// Now all toasts are dismissed (open: false). Trigger REMOVE_TOAST
		// by calling reducer directly on memory state is not possible from
		// outside the module.  Instead we rely on the fact that after dismiss()
		// a timeout fires REMOVE_TOAST — but TOAST_REMOVE_DELAY is 1 000 000 ms,
		// so we can't wait for it.
		//
		// The pragmatic solution: each test calls toast() and checks the
		// useToast result synchronously, so stale dismissed toasts (open:false)
		// from a prior test won't interfere because TOAST_LIMIT is 1 and a new
		// ADD_TOAST will push the old one out.
	})

	afterEach(() => {
		// Best-effort cleanup: dismiss all toasts so module state is quiet
		const { result, unmount } = renderHook(() => useToast())
		act(() => {
			result.current.dismiss()
		})
		unmount()
	})

	it('toast() adds a toast visible via useToast', () => {
		const { result } = renderHook(() => useToast())

		act(() => {
			toast({ title: 'Test toast' })
		})

		expect(result.current.toasts).toHaveLength(1)
		expect(result.current.toasts[0].title).toBe('Test toast')
	})

	it('dismiss() from useToast dismisses a specific toast (sets open: false)', () => {
		const { result } = renderHook(() => useToast())

		let toastId = ''
		act(() => {
			const t = toast({ title: 'Dismiss me' })
			toastId = t.id
		})

		expect(result.current.toasts[0].open).not.toBe(false)

		act(() => {
			result.current.dismiss(toastId)
		})

		expect(result.current.toasts[0].open).toBe(false)
	})

	it('dismiss() without an id dismisses all toasts', () => {
		const { result } = renderHook(() => useToast())

		act(() => {
			toast({ title: 'Only toast due to TOAST_LIMIT=1' })
		})

		act(() => {
			result.current.dismiss()
		})

		expect(result.current.toasts.every((t) => t.open === false)).toBe(true)
	})
})
