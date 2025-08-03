import { test, expect } from '@playwright/test'

test('signup and login credentials', async ({ page }) => {
  const email = `user${Date.now()}@test.com`
  const password = 'superstrongpassaleliuja200**'

  await page.goto('/signup')
  await page.fill('input[placeholder="Sara"]', 'Tomas')
  await page.fill('input[placeholder="Austin"]', 'Upe')
  await page.fill('input[placeholder="name@example.com"]', email)
  await page.fill('input[placeholder="at least 8 characters"]', password)
  await page.click('input[value="Sign up"]')
  await expect(page.locator('.login__success')).toBeVisible()

  await page.goto('/login')
  await page.fill('input[placeholder="name@example.com"]', email)
  await page.fill('input[placeholder="at least 8 characters"]', password)
  await page.click('input[value="Log in"]')
  await expect(page).toHaveURL('/home')

  await page.goto('/login')
  await page.fill('input[placeholder="name@example.com"]', email)
  await page.fill('input[placeholder="at least 8 characters"]', 'somethingrandom')
  await page.click('input[value="Log in"]')
  await expect(page.locator('.login__error')).toBeVisible()

  await page.goto('/notes')
  await page.fill('textarea', 'Today I’m grateful for fresh air and coffee.')
  await page.click('input[type="submit"]')

  const answers = page.locator('textarea')
  await answers.nth(0).fill('grateful for fresh air')
  await answers.nth(1).fill('And for good coffee')

  await page.click('input[type="submit"]')

  await expect(page.locator('.note-view__success')).toContainText('successfully')
})
