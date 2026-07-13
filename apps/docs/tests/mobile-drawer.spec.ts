import { expect, test } from '@playwright/test'

/**
 * Mobile navbar drawer — standard Docusaurus behavior:
 *  - Drawer is hidden until the hamburger is tapped
 *  - Tapping the hamburger opens `.navbar-sidebar`
 *  - The close button hides it again
 *
 * Mobile viewport only; skipped on the desktop project.
 */

test.describe('mobile drawer', () => {
	test.skip(({ viewport }) => (viewport?.width ?? 0) > 996, 'mobile viewport only')

	test('opens and closes from the hamburger', async ({ page }) => {
		await page.goto('/react-common/')

		const drawer = page.locator('.navbar-sidebar')
		await expect(drawer).toBeHidden()

		await page.getByRole('button', { name: /toggle navigation/i }).click()
		await expect(drawer).toBeVisible()

		await page.getByRole('button', { name: /close navigation/i }).click()
		await expect(drawer).toBeHidden()
	})
})
