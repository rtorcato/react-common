import { describe, expect, it } from 'vitest'

import { cn } from '~/lib/utils'

describe('cn', () => {
	it('joins truthy class names', () => {
		expect(cn('a', 'b')).toBe('a b')
	})

	it('drops falsy values', () => {
		expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
	})

	it('resolves conditional object syntax', () => {
		expect(cn('base', { active: true, disabled: false })).toBe('base active')
	})

	it('flattens arrays of classes', () => {
		expect(cn(['a', 'b'], 'c')).toBe('a b c')
	})

	it('merges conflicting tailwind utilities, last wins', () => {
		expect(cn('px-2', 'px-4')).toBe('px-4')
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
	})

	it('keeps non-conflicting tailwind utilities', () => {
		expect(cn('px-2 py-1', 'text-sm')).toBe('px-2 py-1 text-sm')
	})
})
