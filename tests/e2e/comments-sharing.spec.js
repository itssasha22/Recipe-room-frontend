import { test, expect } from '@playwright/test';

test.describe('Comments and Sharing Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
  });

  test('should display comments section on recipe page', async ({ page }) => {
    await page.goto('/recipe/1');
    await expect(page.locator('[data-testid="comments-section"]')).toBeVisible();
    await expect(page.locator('text=Comments')).toBeVisible();
  });

  test('should allow user to post a comment', async ({ page }) => {
    await page.goto('/recipe/1');
    const commentText = 'This recipe looks amazing!';
    await page.fill('[data-testid="comment-textarea"]', commentText);
    await page.click('[data-testid="post-comment-button"]');
    await expect(page.locator(`text=${commentText}`)).toBeVisible();
  });

  test('should display social sharing buttons', async ({ page }) => {
    await page.goto('/recipe/1');
    await expect(page.locator('[data-testid="social-share"]')).toBeVisible();
    await expect(page.locator('text=Share this recipe')).toBeVisible();
    await expect(page.locator('[data-testid="copy-link-button"]')).toBeVisible();
  });

  test('should copy recipe link to clipboard', async ({ page }) => {
    await page.goto('/recipe/1');
    await page.click('[data-testid="copy-link-button"]');
    await expect(page.locator('text=Link copied to clipboard!')).toBeVisible();
  });
});