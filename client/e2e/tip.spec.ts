import { test, expect } from '@playwright/test'
import { asUser } from './utils/api'
import { fakeUser } from './utils/fakeData'

test('tip appears after 5 notes', async ({ page }) => {
  const user = fakeUser()

  await asUser(page, user, async () => {
    await page.goto('/notes')

    for (let i = 1; i <= 5; i++) {
      await page.fill('textarea:nth-of-type(1)', `something ${i}`)
      await page.fill('textarea:nth-of-type(2)', `something ${i}`)
      await page.click('input[type="submit"]')

      await expect(page.locator('.note-view__success')).toBeVisible()

      await page.waitForTimeout(1000)
    }

    await expect(page.locator('.note-view__tip-title')).toHaveText('GratiFact break...💡')
    await expect(page.locator('.note-view__tip')).toContainText(/.+/)
  })
})
