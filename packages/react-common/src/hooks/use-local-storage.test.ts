import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useLocalStorage } from '~/hooks/use-local-storage'

describe('useLocalStorage', () => {
	beforeEach(() => {
		window.localStorage.clear()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('returns the initial value when no entry exists', () => {
		const { result } = renderHook(() => useLocalStorage('missing-key', 'fallback'))
		expect(result.current[0]).toBe('fallback')
	})

	it('reads a pre-existing JSON value from localStorage', () => {
		window.localStorage.setItem('greeting', JSON.stringify('hello'))
		const { result } = renderHook(() => useLocalStorage('greeting', 'default'))
		expect(result.current[0]).toBe('hello')
	})

	it('setValue persists to localStorage and updates state', () => {
		const { result } = renderHook(() => useLocalStorage<number>('count', 0))

		act(() => {
			result.current[1](5)
		})

		expect(result.current[0]).toBe(5)
		expect(window.localStorage.getItem('count')).toBe(JSON.stringify(5))
	})

	it('supports the functional updater form', () => {
		const { result } = renderHook(() => useLocalStorage<number>('count', 1))

		act(() => {
			result.current[1]((prev) => prev + 1)
		})

		expect(result.current[0]).toBe(2)
		expect(window.localStorage.getItem('count')).toBe(JSON.stringify(2))
	})

	it('ignores a stored value that fails the isValid guard', () => {
		window.localStorage.setItem('bad', '{not-json')
		window.localStorage.setItem('wrong', JSON.stringify('text'))
		const isNumber = (v: unknown): v is number => typeof v === 'number'
		expect(renderHook(() => useLocalStorage('bad', 7, isNumber)).result.current[0]).toBe(7)
		expect(renderHook(() => useLocalStorage('wrong', 7, isNumber)).result.current[0]).toBe(7)
	})

	it('keeps a stored value that passes the isValid guard', () => {
		window.localStorage.setItem('n', JSON.stringify(3))
		const { result } = renderHook(() =>
			useLocalStorage('n', 7, (v): v is number => typeof v === 'number')
		)
		expect(result.current[0]).toBe(3)
	})

	it('clear removes the entry and resets to initialValue', () => {
		window.localStorage.setItem('n', JSON.stringify(3))
		const { result } = renderHook(() => useLocalStorage('n', 7))
		expect(result.current[0]).toBe(3)

		act(() => {
			result.current[2]()
		})

		expect(result.current[0]).toBe(7)
		expect(window.localStorage.getItem('n')).toBeNull()
	})

	it('keeps initialValue when storage is blocked', () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('blocked')
		})
		const { result } = renderHook(() => useLocalStorage('k', 'init'))
		expect(result.current[0]).toBe('init')
	})

	it('swallows setItem errors without breaking state updates', () => {
		const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('quota exceeded')
		})

		const { result } = renderHook(() => useLocalStorage<string>('k', 'init'))

		act(() => {
			result.current[1]('next')
		})

		expect(result.current[0]).toBe('next')
		expect(setItemSpy).toHaveBeenCalled()
	})

	it('renders initialValue first so SSR and hydration markup match (#184)', () => {
		window.localStorage.setItem('theme', JSON.stringify('dark'))
		function Probe() {
			return useLocalStorage('theme', 'light')[0]
		}
		expect(renderToString(createElement(Probe))).toBe('light')

		const seen: string[] = []
		const { result } = renderHook(() => {
			const r = useLocalStorage('theme', 'light')
			seen.push(r[0])
			return r
		})
		expect(seen[0]).toBe('light')
		expect(result.current[0]).toBe('dark')
	})
})
