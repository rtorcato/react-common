import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { projectFamilyItems } from '@rtorcato/shared-docs'
import { themes as prismThemes } from 'prism-react-renderer'

// The @rtorcato open-source family — single source of truth in @rtorcato/shared-docs.
// Surfaced as a navbar "Projects" dropdown (Docusaurus renders navbar items in the
// mobile menu too) and in the footer, so every sibling site cross-links to the rest.
const GITHUB_PROFILE = 'https://github.com/rtorcato'
const PROJECT_FAMILY = projectFamilyItems()

const config: Config = {
	title: 'react-common',
	tagline: 'A React component library built on shadcn/ui, Radix UI, and Tailwind CSS v4.',
	favicon: 'img/favicon.svg',

	url: 'https://rtorcato.github.io',
	baseUrl: '/react-common/',

	organizationName: 'rtorcato',
	projectName: 'react-common',

	onBrokenLinks: 'warn',

	markdown: {
		format: 'detect',
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	headTags: [
		{
			tagName: 'link',
			attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'anonymous',
			},
		},
	],

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Docs live under /docs so the marketing landing (src/pages/index.tsx) owns '/'.
					routeBasePath: '/docs',
					editUrl: 'https://github.com/rtorcato/react-common/edit/main/apps/docs/',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			// Generates the API reference under docs/api on every build, so it can't
			// go stale. One page per module (hook/util/provider) — mirror the barrel
			// in packages/react-common/src/index.ts when the public surface changes.
			// shadcn-ui coverage stays a follow-up (primitives are documented upstream
			// at ui.shadcn.com; TypeDoc on 50+ forwardRef components is noisy).
			'docusaurus-plugin-typedoc',
			{
				entryPoints: [
					'../../packages/react-common/src/hooks/use-click-outside.ts',
					'../../packages/react-common/src/hooks/use-debounce.ts',
					'../../packages/react-common/src/hooks/use-local-storage.ts',
					'../../packages/react-common/src/hooks/use-media-query.ts',
					'../../packages/react-common/src/hooks/use-mobile.ts',
					'../../packages/react-common/src/hooks/use-previous.ts',
					'../../packages/react-common/src/hooks/use-sidebar.ts',
					'../../packages/react-common/src/hooks/use-toggle.ts',
					'../../packages/react-common/src/lib/utils.ts',
					'../../packages/react-common/src/providers/theme-provider.tsx',
				],
				tsconfig: '../../packages/react-common/tsconfig.json',
				out: 'docs/api',
				readme: 'none',
				includeVersion: false,
				excludePrivate: true,
				excludeInternal: true,
				excludeExternals: true,
				sort: ['source-order'],
				outputFileStrategy: 'modules',
				sidebar: { autoConfiguration: false },
			},
		],
		[
			'@easyops-cn/docusaurus-search-local',
			{
				hashed: true,
				indexDocs: true,
				indexBlog: false,
				docsRouteBasePath: '/docs',
				highlightSearchTermsOnTargetPage: true,
				searchBarShortcutHint: false,
			},
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: 'dark',
			respectPrefersColorScheme: true,
		},
		navbar: {
			// The wordmark is baked into the SVG logo (light + dark), so title stays empty.
			title: '',
			logo: {
				alt: 'react-common',
				src: 'img/logo.svg',
				srcDark: 'img/logo-dark.svg',
				width: 150,
				height: 26,
			},
			items: [
				{ to: '/docs', position: 'left', label: 'Docs' },
				{
					type: 'dropdown',
					label: 'Projects',
					position: 'left',
					items: [{ label: 'All on GitHub →', href: GITHUB_PROFILE }, ...PROJECT_FAMILY],
				},
				{
					// Deployed alongside the docs site (see .github/workflows/docs.yml).
					href: 'pathname:///react-common/storybook/',
					label: 'Storybook',
					position: 'right',
				},
				{
					href: 'https://github.com/rtorcato/react-common',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Documentation',
					items: [{ label: 'Getting started', to: '/docs' }],
				},
				{
					title: 'Resources',
					items: [
						{ label: 'GitHub', href: 'https://github.com/rtorcato/react-common' },
						{
							label: 'npm',
							href: 'https://www.npmjs.com/package/@rtorcato/shadcn-ui',
						},
						{ label: '@rtorcato', href: GITHUB_PROFILE },
					],
				},
				{
					title: 'Projects',
					items: PROJECT_FAMILY,
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Richard Torcato. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.vsDark,
			darkTheme: prismThemes.vsDark,
			additionalLanguages: ['bash', 'json', 'typescript', 'tsx'],
		},
	} satisfies Preset.ThemeConfig,
}

export default config
