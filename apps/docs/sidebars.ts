import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

// Explicit ordering (api-common pattern). As Components (#8) and the
// TypeDoc API reference (#9) land, add their categories here.
const sidebars: SidebarsConfig = {
	docs: ['index', 'getting-started', 'tailwind-setup', 'theming', 'hooks'],
}

export default sidebars
