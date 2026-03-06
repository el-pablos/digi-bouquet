import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('halaman load dengan title yang benar', async ({ page }) => {
    await expect(page).toHaveTitle(/Digi-Bouquet/i);
  });

  test('logo Digi-Bouquet muncul', async ({ page }) => {
    const logo = page.getByAltText('Digi-Bouquet logo');
    await expect(logo).toBeVisible();
  });

  test('headline Beautiful Flowers ada', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Beautiful Flowers');
    await expect(heading).toContainText('Delivered Digitally');
  });

  test('3 tombol navigasi ada dan terlihat', async ({ page }) => {
    const buildColor = page.getByRole('link', { name: /Buat bouquet berwarna/i });
    const buildMono = page.getByRole('link', { name: /Buat bouquet hitam putih/i });
    const viewGarden = page.getByRole('link', { name: /Lihat garden bouquet/i });

    await expect(buildColor).toBeVisible();
    await expect(buildMono).toBeVisible();
    await expect(viewGarden).toBeVisible();
  });

  test('tombol Build a Bouquet navigasi ke /bouquet?mode=color', async ({ page }) => {
    const buildColor = page.getByRole('link', { name: /Buat bouquet berwarna/i });
    await buildColor.click();
    await expect(page).toHaveURL(/\/bouquet\?mode=color/);
  });

  test('tombol Build It in Black and White navigasi ke /bouquet?mode=mono', async ({ page }) => {
    const buildMono = page.getByRole('link', { name: /Buat bouquet hitam putih/i });
    await buildMono.click();
    await expect(page).toHaveURL(/\/bouquet\?mode=mono/);
  });

  test('tombol View Garden navigasi ke /garden', async ({ page }) => {
    const viewGarden = page.getByRole('link', { name: /Lihat garden bouquet/i });
    await viewGarden.click();
    await expect(page).toHaveURL(/\/garden/);
  });

  test('footer links ada', async ({ page }) => {
    const vercelLink = page.getByRole('link', { name: /Powered by Vercel/i });
    const madeByLink = page.getByRole('link', { name: /Made by pau_wee_/i });

    await expect(vercelLink).toBeVisible();
    await expect(madeByLink).toBeVisible();
  });
});
