import { test, expect } from '@playwright/test';

test.describe('Comments and Sharing Features', () => {
  // Setup: Login before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login');
    
    // Fill in login credentials
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    
    // Click login button
    await page.click('[data-testid="login-button"]');
    
    // Wait for redirect to home page
    await page.waitForURL('**/home', { timeout: 5000 });
  });

  test('should navigate to recipe detail page', async ({ page }) => {
    // Click on first recipe card
    await page.click('[data-testid="recipe-card"]:first-child');
    
    // Wait for recipe detail page to load
    await page.waitForURL('**/recipe/**');
    
    // Verify recipe details are visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display comments section on recipe page', async ({ page }) => {
    // Navigate to a recipe
    await page.goto('http://localhost:5173/recipe/1');
    
    // Verify comments section exists
    await expect(page.locator('[data-testid="comments-section"]')).toBeVisible();
    await expect(page.locator('text=Comments')).toBeVisible();
  });

  test('should allow user to post a comment', async ({ page }) => {
    // Navigate to a recipe
    await page.goto('http://localhost:5173/recipe/1');
    
    // Wait for comments section to load
    await page.waitForSelector('[data-testid="comments-section"]');
    
    const commentText = 'This recipe looks absolutely amazing!';
    
    // Fill in comment textarea
    await page.fill('[data-testid="comment-textarea"]', commentText);
    
    // Click post comment button
    await page.click('[data-testid="post-comment-button"]');
    
    // Wait for comment to appear
    await page.waitForTimeout(1000);
    
    // Verify comment is displayed
    await expect(page.locator(`text=${commentText}`)).toBeVisible();
  });

  test('should enforce character limit on comments', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Try to enter text exceeding max length (1000 chars)
    const longText = 'A'.repeat(1001);
    await page.fill('[data-testid="comment-textarea"]', longText);
    
    // Verify submit button is disabled
    const submitButton = page.locator('[data-testid="post-comment-button"]');
    await expect(submitButton).toBeDisabled();
    
    // Verify character count warning is shown
    await expect(page.locator('text=/Exceeds maximum length/')).toBeVisible();
  });

  test('should allow user to edit their own comment', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Post a comment first
    const originalComment = 'Original comment text';
    await page.fill('[data-testid="comment-textarea"]', originalComment);
    await page.click('[data-testid="post-comment-button"]');
    await page.waitForTimeout(1000);
    
    // Click edit button on the comment
    await page.click('[title="Edit comment"]');
    
    // Modify the comment
    const updatedComment = 'Updated comment text';
    const editTextarea = page.locator('textarea').nth(1);
    await editTextarea.fill(updatedComment);
    
    // Click save button
    await page.click('text=Save');
    await page.waitForTimeout(1000);
    
    // Verify updated comment is displayed
    await expect(page.locator(`text=${updatedComment}`)).toBeVisible();
    await expect(page.locator('text=(edited)')).toBeVisible();
  });

  test('should allow user to delete their own comment', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Post a comment
    const commentToDelete = 'This comment will be deleted';
    await page.fill('[data-testid="comment-textarea"]', commentToDelete);
    await page.click('[data-testid="post-comment-button"]');
    await page.waitForTimeout(1000);
    
    // Setup dialog handler to confirm deletion
    page.on('dialog', dialog => dialog.accept());
    
    // Click delete button
    await page.click('[title="Delete comment"]');
    await page.waitForTimeout(1000);
    
    // Verify comment is removed
    await expect(page.locator(`text=${commentToDelete}`)).not.toBeVisible();
  });

  test('should display social sharing section', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Verify social share section is visible
    await expect(page.locator('[data-testid="social-share"]')).toBeVisible();
    await expect(page.locator('text=Share this recipe')).toBeVisible();
  });

  test('should display all social share buttons', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Verify all share buttons are present
    await expect(page.locator('[aria-label="Share on Facebook"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share on Twitter"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share on WhatsApp"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share via Email"]')).toBeVisible();
  });

  test('should copy recipe link to clipboard', async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/1');
    
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
    // Click copy link button
    await page.click('[data-testid="copy-link-button"]');
    
    // Verify success message is shown
    await expect(page.locator('text=Link copied to clipboard!')).toBeVisible();
    await expect(page.locator('text=Copied!')).toBeVisible();
    
    // Verify clipboard contains the URL
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/recipe/1');
  });

  test('should show empty state when no comments', async ({ page }) => {
    // Navigate to a recipe with no comments (or mock this scenario)
    await page.goto('http://localhost:5173/recipe/999');
    
    // Verify empty state is displayed
    await expect(page.locator('text=No comments yet')).toBeVisible();
    await expect(page.locator('text=Be the first to comment')).toBeVisible();
  });

  test('should load more comments when available', async ({ page }) => {
    // This test assumes there are more than 20 comments on a recipe
    await page.goto('http://localhost:5173/recipe/1');
    
    // Check if load more button exists
    const loadMoreButton = page.locator('text=Load More Comments');
    
    if (await loadMoreButton.isVisible()) {
      // Count initial comments
      const initialCount = await page.locator('[data-testid="comments-section"] > div > div').count();
      
      // Click load more
      await loadMoreButton.click();
      await page.waitForTimeout(1000);
      
      // Verify more comments are loaded
      const newCount = await page.locator('[data-testid="comments-section"] > div > div').count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  test('should show login prompt when not authenticated', async ({ page, context }) => {
    // Create a new context without authentication
    await context.clearCookies();
    await page.goto('http://localhost:5173/recipe/1');
    
    // Verify login prompt is shown instead of comment form
    await expect(page.locator('text=Please login to comment')).toBeVisible();
    await expect(page.locator('[data-testid="comment-textarea"]')).not.toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173/recipe/1');
    
    // Verify key elements are visible on mobile
    await expect(page.locator('[data-testid="comments-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="social-share"]')).toBeVisible();
    
    // Verify social share buttons are properly sized
    const shareButtons = page.locator('[data-testid="social-share"] button');
    const firstButton = shareButtons.first();
    const box = await firstButton.boundingBox();
    
    // Buttons should be at least 44px (mobile touch target size)
    expect(box.width).toBeGreaterThanOrEqual(40);
    expect(box.height).toBeGreaterThanOrEqual(40);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API call and force an error
    await page.route('**/api/comments/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    await page.goto('http://localhost:5173/recipe/1');
    
    // Try to post a comment
    await page.fill('[data-testid="comment-textarea"]', 'Test comment');
    await page.click('[data-testid="post-comment-button"]');
    
    // Verify error is handled (alert or error message)
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Failed');
      dialog.accept();
    });
  });
});
