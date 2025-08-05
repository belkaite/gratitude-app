import { test, expect } from '@playwright/test'
import { asUser } from './utils/api'
import { fakeUser } from './utils/fakeData'

test('ai reflection', async ({ page }) => {
  const user = fakeUser()

  await asUser(page, user, async () => {
    await page.goto('/notes')

    await page.fill('textarea:nth-of-type(1)', 'grateful for my cat')
    await page.fill('textarea:nth-of-type(2)', 'quiet evenings')
    await page.click('input[type="submit"]')

    await expect(page.locator('.note-view__success')).toContainText('successfully')

    await page.locator('.note-view__circle-background').click()

    await expect(page.locator('.note-view__gratibot-text')).toContainText(/.+/)
  })
})
