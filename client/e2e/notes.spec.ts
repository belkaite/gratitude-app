import { test, expect } from '@playwright/test'
import { fakeUser } from './utils/fakeData'
import { asUser } from './utils/api'

test('submit gratitude note', async ({ page }) => {
  const user = fakeUser()

  await asUser(page, user, async () => {
    await page.goto('/notes')
    await page.fill('textarea', 'Grateful for sunlight and books.')
    await page.click('input[type="submit"]')

    const answers = page.locator('textarea')
    await answers.nth(0).fill('grateful for fresh air')
    await answers.nth(1).fill('And for good coffee')
    await page.click('input[type="submit"]')

    await expect(page.locator('.note-view__success')).toContainText('successfully')
  })
})
