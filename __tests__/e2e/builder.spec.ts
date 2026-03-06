import { test, expect } from '@playwright/test';

test.describe('Bouquet Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bouquet?mode=color');
  });

  test('halaman builder load dengan heading yang benar', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Pick 6 to 10 Blooms');
  });

  test('menampilkan 12 bunga di grid', async ({ page }) => {
    const flowerButtons = page.locator('button[aria-label^="Pilih bunga"]');
    await expect(flowerButtons).toHaveCount(12);
  });

  test('counter dimulai dari 0/10', async ({ page }) => {
    await expect(page.getByText('0/10')).toBeVisible();
  });

  test('counter update saat pilih bunga', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    await firstFlower.click();
    await expect(page.getByText('1/10')).toBeVisible();

    await firstFlower.click();
    await expect(page.getByText('2/10')).toBeVisible();
  });

  test('tombol Next disabled saat bunga kurang dari 6', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });
    await expect(nextButton).toBeDisabled();

    // Pilih 5 bunga (kurang dari min)
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 5; i++) {
      await firstFlower.click();
    }
    await expect(nextButton).toBeDisabled();
  });

  test('tombol Next enabled setelah pilih 6 bunga', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });

    for (let i = 0; i < 6; i++) {
      await firstFlower.click();
    }
    await expect(nextButton).toBeEnabled();
  });

  test('reset menghapus semua pilihan', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 3; i++) {
      await firstFlower.click();
    }
    await expect(page.getByText('3/10')).toBeVisible();

    const resetButton = page.getByRole('button', { name: /Reset semua/i });
    await resetButton.click();
    await expect(page.getByText('0/10')).toBeVisible();
  });

  test('preview muncul setelah klik Next', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 6; i++) {
      await firstFlower.click();
    }

    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });
    await nextButton.click();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Your Bouquet');

    // Back dan Send buttons harus ada
    await expect(page.getByRole('button', { name: /Kembali ke pemilihan/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Kirim bouquet ke garden/i })).toBeVisible();
  });

  test('submit bouquet sukses dan tampilkan pesan', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 6; i++) {
      await firstFlower.click();
    }

    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });
    await nextButton.click();

    const sendButton = page.getByRole('button', { name: /Kirim bouquet ke garden/i });
    await sendButton.click();

    // Tunggu response — should show success
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Bouquet Sent!', { timeout: 15000 });

    // Link ke garden harus muncul
    await expect(page.getByRole('link', { name: /Lihat garden/i })).toBeVisible();
  });

  test('mode mono menggunakan URL /bouquet?mode=mono', async ({ page }) => {
    await page.goto('/bouquet?mode=mono');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Pick 6 to 10 Blooms');
  });

  test('tombol Back kembali ke step 1', async ({ page }) => {
    const firstFlower = page.locator('button[aria-label^="Pilih bunga"]').first();
    for (let i = 0; i < 6; i++) {
      await firstFlower.click();
    }

    const nextButton = page.getByRole('button', { name: /Lanjut ke preview/i });
    await nextButton.click();

    const backButton = page.getByRole('button', { name: /Kembali ke pemilihan/i });
    await backButton.click();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Pick 6 to 10 Blooms');
  });
});
