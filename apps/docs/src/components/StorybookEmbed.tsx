import useBaseUrl from '@docusaurus/useBaseUrl'
import type { CSSProperties } from 'react'

interface StorybookEmbedProps {
	/** Storybook story id, e.g. `ui-extended-datatable--default`. */
	storyId: string
	/** Iframe height in px (default 360). */
	height?: number
}

/**
 * Embeds a deployed Storybook story as an isolated iframe. Storybook is served
 * alongside the docs at /react-common/storybook/ (see docs.yml), and its own
 * document scopes the shadcn/Tailwind styles — so demos render without leaking
 * into the Docusaurus theme.
 */
export default function StorybookEmbed({ storyId, height = 360 }: StorybookEmbedProps) {
	const iframeBase = useBaseUrl('/storybook/iframe.html')
	const managerBase = useBaseUrl('/storybook/')

	const wrapStyle: CSSProperties = {
		border: '1px solid var(--ifm-color-emphasis-300)',
		borderRadius: 8,
		overflow: 'hidden',
		marginBottom: '1.5rem',
	}
	const footStyle: CSSProperties = {
		padding: '6px 12px',
		fontSize: 13,
		borderTop: '1px solid var(--ifm-color-emphasis-300)',
	}

	return (
		<div style={wrapStyle}>
			<iframe
				src={`${iframeBase}?id=${storyId}&viewMode=story`}
				title={storyId}
				loading="lazy"
				style={{ width: '100%', height, border: 0, display: 'block' }}
			/>
			<div style={footStyle}>
				<a href={`${managerBase}?path=/story/${storyId}`} target="_blank" rel="noreferrer">
					Open in Storybook ↗
				</a>
			</div>
		</div>
	)
}
