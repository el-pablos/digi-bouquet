import {
  FLOWERS,
  FLOWER_NAMES,
  getFlowerImageUrl,
  getBushBackgroundUrl,
  getBushTopUrl,
  getRandomBushIndex,
  isValidFlower,
} from '@/lib/flowers';

describe('Flowers data dan URL generator', () => {
  describe('FLOWERS constant', () => {
    it('memiliki tepat 12 jenis bunga', () => {
      expect(FLOWERS).toHaveLength(12);
    });

    it('setiap bunga punya name dan label', () => {
      FLOWERS.forEach((flower) => {
        expect(flower.name).toBeDefined();
        expect(flower.label).toBeDefined();
        expect(typeof flower.name).toBe('string');
        expect(typeof flower.label).toBe('string');
      });
    });

    it('berisi semua 12 nama bunga yang benar', () => {
      const expectedNames = [
        'orchid', 'tulip', 'dahlia', 'anemone', 'carnation', 'zinnia',
        'ranunculus', 'sunflower', 'lily', 'daisy', 'peony', 'rose',
      ];
      const names = FLOWERS.map((f) => f.name);
      expect(names).toEqual(expectedNames);
    });
  });

  describe('FLOWER_NAMES', () => {
    it('memiliki tepat 12 item', () => {
      expect(FLOWER_NAMES).toHaveLength(12);
    });
  });

  describe('getFlowerImageUrl', () => {
    it('menghasilkan URL yang benar untuk mode color', () => {
      const url = getFlowerImageUrl('rose', 'color');
      expect(url).toBe(
        'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/flowers/rose.webp'
      );
    });

    it('menghasilkan URL yang benar untuk mode mono', () => {
      const url = getFlowerImageUrl('orchid', 'mono');
      expect(url).toBe(
        'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono/flowers/orchid.webp'
      );
    });
  });

  describe('getBushBackgroundUrl', () => {
    it('menghasilkan URL bush background yang benar', () => {
      const url = getBushBackgroundUrl(1, 'color');
      expect(url).toBe(
        'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/bush/bush-1.png'
      );
    });

    it('menghasilkan URL bush background mono', () => {
      const url = getBushBackgroundUrl(2, 'mono');
      expect(url).toBe(
        'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono/bush/bush-2.png'
      );
    });
  });

  describe('getBushTopUrl', () => {
    it('menghasilkan URL bush top yang benar', () => {
      const url = getBushTopUrl(3, 'color');
      expect(url).toBe(
        'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/bush/bush-3-top.png'
      );
    });
  });

  describe('getRandomBushIndex', () => {
    it('mengembalikan angka 1, 2, atau 3', () => {
      for (let i = 0; i < 50; i++) {
        const index = getRandomBushIndex();
        expect([1, 2, 3]).toContain(index);
      }
    });
  });

  describe('isValidFlower', () => {
    it('mengembalikan true untuk nama bunga yang valid', () => {
      expect(isValidFlower('rose')).toBe(true);
      expect(isValidFlower('orchid')).toBe(true);
      expect(isValidFlower('peony')).toBe(true);
    });

    it('mengembalikan false untuk nama bunga yang tidak valid', () => {
      expect(isValidFlower('cactus')).toBe(false);
      expect(isValidFlower('')).toBe(false);
      expect(isValidFlower('ROSE')).toBe(false);
    });
  });
});
