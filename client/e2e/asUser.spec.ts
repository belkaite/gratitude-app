import { test, expect } from '@playwright/test'
import { fakeUser } from './utils/fakeData'

test('signup and login', async ({ page }) => {
  const user = fakeUser()

  await page.goto('/signup')
  await page.fill('input[placeholder="Sara"]', user.firstName)
  await page.fill('input[placeholder="Austin"]', user.lastName)
  await page.fill('input[placeholder="name@example.com"]', user.email)
  await page.fill('input[placeholder="at least 8 characters"]', user.password)
  await page.click('input[value="Sign up"]')
  await expect(page.locator('.login__success')).toBeVisible()

  await page.goto('/login')
  await page.fill('input[placeholder="name@example.com"]', user.email)
  await page.fill('input[placeholder="at least 8 characters"]', user.password)
  await page.click('input[value="Log in"]')
  await expect(page).toHaveURL('/home')

  await page.goto('/login')
  await page.fill('input[placeholder="name@example.com"]', user.email)
  await page.fill('input[placeholder="at least 8 characters"]', 'somethingrandom')
  await page.click('input[value="Log in"]')
  await expect(page.locator('.login__error')).toBeVisible()
})
