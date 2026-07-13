import { expect, test } from '@playwright/test'

/**
 * Basic navigation smoke: the landing page and the docs section load, the
 * primary nav works, and nothing throws a console/page error along the way.
 */

/** Collect console errors + uncaught page errors for the duration of a test. */
function trackErrors(page: import('@playwright/test').Page): string[] {
	const errors: string[] = []
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text())
	})
	page.on('pageerror', (err) => errors.push(err.message))
	return errors
}

test.describe('docs smoke', () => {
	test('landing page loads without errors', async ({ page }) => {
		const errors = trackErrors(page)

		await page.goto('/react-common/')

		// Navbar logo (alt="react-common") is present on every page.
		await expect(page.getByRole('img', { name: 'react-common' }).first()).toBeVisible()
		expect(errors, `console/page errors: ${errors.join(' | ')}`).toEqual([])
	})

	test('docs landing loads without errors', async ({ page }) => {
		const errors = trackErrors(page)

		await page.goto('/react-common/docs')

		await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
		expect(errors, `console/page errors: ${errors.join(' | ')}`).toEqual([])
	})

	// Desktop only: the mobile navbar routes through the drawer (covered by
	// mobile-drawer.spec), so the inline nav link isn't directly clickable there.
	test('navigates landing → docs via the navbar', async ({ page, viewport }) => {
		test.skip((viewport?.width ?? 0) <= 996, 'desktop viewport only')
		const errors = trackErrors(page)

		await page.goto('/react-common/')
		await page.getByRole('navigation').getByRole('link', { name: 'Docs' }).click()

		await expect(page).toHaveURL(/\/react-common\/docs\/?$/)
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
		expect(errors, `console/page errors: ${errors.join(' | ')}`).toEqual([])
	})
})
