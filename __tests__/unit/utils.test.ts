import { generateId, formatDate, validateFlowerCount, clamp } from '@/lib/utils';

describe('Utility functions', () => {
  describe('generateId', () => {
    it('menghasilkan string unik', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(typeof id1).toBe('string');
      expect(id1).not.toBe(id2);
    });

    it('menghasilkan format UUID v4', () => {
      const id = generateId();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidRegex);
    });
  });

  describe('formatDate', () => {
    it('memformat tanggal ke format M/D/YYYY', () => {
      const result = formatDate('2026-02-15T10:00:00.000Z');
      expect(result).toBe('2/15/2026');
    });

    it('memformat tanggal di awal bulan', () => {
      const result = formatDate('2026-01-01T00:00:00.000Z');
      expect(result).toBe('1/1/2026');
    });

    it('memformat tanggal di akhir tahun', () => {
      const result = formatDate('2026-12-31T23:59:59.000Z');
      // Note: timezone might affect the day
      expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    });
  });

  describe('validateFlowerCount', () => {
    it('mengembalikan true untuk jumlah 6-10', () => {
      expect(validateFlowerCount(6)).toBe(true);
      expect(validateFlowerCount(7)).toBe(true);
      expect(validateFlowerCount(8)).toBe(true);
      expect(validateFlowerCount(9)).toBe(true);
      expect(validateFlowerCount(10)).toBe(true);
    });

    it('mengembalikan false untuk jumlah kurang dari 6', () => {
      expect(validateFlowerCount(0)).toBe(false);
      expect(validateFlowerCount(5)).toBe(false);
    });

    it('mengembalikan false untuk jumlah lebih dari 10', () => {
      expect(validateFlowerCount(11)).toBe(false);
      expect(validateFlowerCount(100)).toBe(false);
    });
  });

  describe('clamp', () => {
    it('mengembalikan nilai jika dalam range', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('mengembalikan min jika nilai terlalu kecil', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('mengembalikan max jika nilai terlalu besar', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('mengembalikan min jika nilai sama dengan min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('mengembalikan max jika nilai sama dengan max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });
});
