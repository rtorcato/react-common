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
	title: 'shadcn-ui',
	tagline: 'A React component library built on shadcn/ui, Radix UI, and Tailwind CSS v4.',
	favicon: 'img/favicon.svg',

	url: 'https://rtorcato.github.io',
	baseUrl: '/shadcn-ui/',

	organizationName: 'rtorcato',
	projectName: 'shadcn-ui',

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
					editUrl: 'https://github.com/rtorcato/shadcn-ui/edit/main/apps/docs/',
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
				alt: 'shadcn-ui',
				src: 'img/logo.svg',
				srcDark: 'img/logo-dark.svg',
				width: 112,
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
					href: 'https://github.com/rtorcato/shadcn-ui',
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
						{ label: 'GitHub', href: 'https://github.com/rtorcato/shadcn-ui' },
						{
							label: 'npm',
							href: 'https://www.npmjs.com/package/@rtorcato/shadcn-ui',
						},
						{ label: 'GitHub profile', href: GITHUB_PROFILE },
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
