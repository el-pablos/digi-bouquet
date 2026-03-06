import { BouquetItem } from '@/types';
import {
  capitalizeFirst,
  generateWhatsAppMessage,
  generateWhatsAppUrl,
} from '@/lib/whatsapp';

describe('lib/whatsapp', () => {
  const baseBouquet: BouquetItem = {
    id: 'test-id-123',
    flowers: ['rose', 'tulip', 'orchid', 'dahlia', 'peony', 'lily'],
    mode: 'color',
    bushIndex: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
  };

  describe('capitalizeFirst', () => {
    it('mengkapitalisasi huruf pertama', () => {
      expect(capitalizeFirst('rose')).toBe('Rose');
      expect(capitalizeFirst('tulip')).toBe('Tulip');
    });
  });

  describe('generateWhatsAppMessage', () => {
    it('mengandung nama semua bunga', () => {
      const msg = generateWhatsAppMessage(baseBouquet);
      expect(msg).toContain('Rose');
      expect(msg).toContain('Tulip');
      expect(msg).toContain('Orchid');
    });

    it('mengandung toName jika ada', () => {
      const bouquet = { ...baseBouquet, toName: 'Anisa' };
      const msg = generateWhatsAppMessage(bouquet);
      expect(msg).toContain('Anisa');
    });

    it('mengandung fromName jika ada', () => {
      const bouquet = { ...baseBouquet, fromName: 'Budi' };
      const msg = generateWhatsAppMessage(bouquet);
      expect(msg).toContain('Budi');
    });

    it('mengandung message jika ada', () => {
      const bouquet = { ...baseBouquet, message: 'Selamat ulang tahun!' };
      const msg = generateWhatsAppMessage(bouquet);
      expect(msg).toContain('Selamat ulang tahun!');
    });

    it('mengandung default text jika toName tidak ada', () => {
      const msg = generateWhatsAppMessage(baseBouquet);
      expect(msg).toContain('Dear kamu');
    });

    it('mengandung bouquet id dalam URL', () => {
      const msg = generateWhatsAppMessage(baseBouquet);
      expect(msg).toContain('/bouquet/test-id-123');
    });

    it('menampilkan mode mono dengan teks yang sesuai', () => {
      const bouquet = { ...baseBouquet, mode: 'mono' as const };
      const msg = generateWhatsAppMessage(bouquet);
      expect(msg).toContain('elegan hitam putih');
    });
  });

  describe('generateWhatsAppUrl', () => {
    it('normalisasi 08xxx menjadi 628xxx', () => {
      const url = generateWhatsAppUrl('08123456789', 'Hello');
      expect(url).toContain('wa.me/628123456789');
    });

    it('normalisasi 628xxx tetap 628xxx', () => {
      const url = generateWhatsAppUrl('628123456789', 'Hello');
      expect(url).toContain('wa.me/628123456789');
    });

    it('encode spasi dan karakter khusus', () => {
      const url = generateWhatsAppUrl('08123456789', 'Hello World!');
      expect(url).toContain('Hello%20World!');
    });

    it('hasil URL dimulai dengan https://wa.me/', () => {
      const url = generateWhatsAppUrl('08123456789', 'Test');
      expect(url).toMatch(/^https:\/\/wa\.me\//);
    });
  });
});
