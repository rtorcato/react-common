import { describe, expect, it } from 'vitest'

import { cn } from '~/lib/utils'

describe('cn', () => {
	it('joins class names with spaces', () => {
		expect(cn('a', 'b')).toBe('a b')
	})

	it('drops falsy values', () => {
		expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
	})

	it('supports conditional object syntax', () => {
		expect(cn('base', { active: true, disabled: false })).toBe('base active')
	})

	it('flattens arrays', () => {
		expect(cn(['a', 'b'], 'c')).toBe('a b c')
	})

	it('resolves conflicting tailwind classes so the last one wins', () => {
		expect(cn('px-2', 'px-4')).toBe('px-4')
		expect(cn('text-sm', 'text-lg')).toBe('text-lg')
	})

	it('keeps non-conflicting tailwind utilities', () => {
		expect(cn('px-2', 'py-4')).toBe('px-2 py-4')
	})
})
