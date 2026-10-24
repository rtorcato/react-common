import { renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { useHasMounted } from '~/hooks/use-has-mounted'

describe('useHasMounted', () => {
	it('is true once mounted on the client', () => {
		const { result } = renderHook(() => useHasMounted())
		expect(result.current).toBe(true)
	})

	it('is false during server rendering', () => {
		function Probe() {
			return createElement('span', null, String(useHasMounted()))
		}
		expect(renderToString(createElement(Probe))).toContain('false')
	})
})
