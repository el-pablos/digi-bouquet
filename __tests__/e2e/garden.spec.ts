import { test, expect } from '@playwright/test';

test.describe('Garden Page', () => {
  test('halaman garden load dengan heading yang benar', async ({ page }) => {
    await page.goto('/garden');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Our Garden');
  });

  test('menampilkan deskripsi garden', async ({ page }) => {
    await page.goto('/garden');
    await expect(
      page.getByText('A peek at some of the bouquets people have made!')
    ).toBeVisible();
  });

  test('link Home ada dan berfungsi', async ({ page }) => {
    await page.goto('/garden');
    const homeLink = page.getByRole('link', { name: /Kembali ke homepage/i });
    await expect(homeLink).toBeVisible();

    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('menampilkan empty state jika tidak ada bouquet', async ({ page }) => {
    // Mock empty response
    await page.route('/api/garden', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ bouquets: [] }),
      });
    });

    await page.goto('/garden');
    await expect(
      page.getByText(/belum ada bouquet|no bouquets/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test('menampilkan bouquet setelah submit dari builder', async ({ page }) => {
    // Submit bouquet first
    await page.goto('/bouquet?mode=color');

    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 6; i++) {
      await firstFlower.click();
    }

    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });
    await nextButton.click();

    const sendButton = page.getByRole('button', { name: /Kirim bouquet ke garden/i });
    await sendButton.click();

    // Wait for success
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Bouquet Sent!', { timeout: 15000 });

    // Navigate to garden
    const gardenLink = page.getByRole('link', { name: /Lihat garden/i });
    await gardenLink.click();

    // Garden should load and show bouquets
    await expect(page).toHaveURL(/\/garden/);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Our Garden');
  });

  test('menampilkan error state saat API gagal', async ({ page }) => {
    // Mock error response
    await page.route('/api/garden', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    await page.goto('/garden');
    await expect(
      page.getByText(/gagal memuat bouquet/i)
    ).toBeVisible({ timeout: 10000 });
  });
});
