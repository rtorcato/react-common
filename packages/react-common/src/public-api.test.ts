import { describe, expect, it } from 'vitest'

import * as api from './index'

// Locks the public export surface of @rtorcato/react-common. If this snapshot
// changes, the public API changed — update it deliberately and add a changeset
// (a bump). Types are erased at runtime, so this covers runtime exports only.
describe('public API surface', () => {
	it('exports exactly the locked surface', () => {
		expect(Object.keys(api).sort()).toMatchInlineSnapshot(`
			[
			  "ThemeProvider",
			  "cn",
			  "useClickOutside",
			  "useDebounce",
			  "useIsMobile",
			  "useLocalStorage",
			  "useMediaQuery",
			  "usePrevious",
			  "useSidebar",
			  "useTheme",
			  "useToggle",
			]
		`)
	})
})
