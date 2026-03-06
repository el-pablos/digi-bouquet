import { FlowerType, FlowerData, BouquetMode, BushIndex } from '@/types';

const CDN_BASE = 'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev';

export const FLOWERS: FlowerData[] = [
  { name: 'orchid', label: 'Orchid' },
  { name: 'tulip', label: 'Tulip' },
  { name: 'dahlia', label: 'Dahlia' },
  { name: 'anemone', label: 'Anemone' },
  { name: 'carnation', label: 'Carnation' },
  { name: 'zinnia', label: 'Zinnia' },
  { name: 'ranunculus', label: 'Ranunculus' },
  { name: 'sunflower', label: 'Sunflower' },
  { name: 'lily', label: 'Lily' },
  { name: 'daisy', label: 'Daisy' },
  { name: 'peony', label: 'Peony' },
  { name: 'rose', label: 'Rose' },
];

export const FLOWER_NAMES: FlowerType[] = FLOWERS.map((f) => f.name);

export function getFlowerImageUrl(flower: FlowerType, mode: BouquetMode): string {
  return `${CDN_BASE}/${mode}/flowers/${flower}.webp`;
}

export function getBushBackgroundUrl(bushIndex: BushIndex, mode: BouquetMode): string {
  return `${CDN_BASE}/${mode}/bush/bush-${bushIndex}.png`;
}

export function getBushTopUrl(bushIndex: BushIndex, mode: BouquetMode): string {
  return `${CDN_BASE}/${mode}/bush/bush-${bushIndex}-top.png`;
}

export function getRandomBushIndex(): BushIndex {
  const options: BushIndex[] = [1, 2, 3];
  return options[Math.floor(Math.random() * options.length)];
}

export function isValidFlower(name: string): name is FlowerType {
  return FLOWER_NAMES.includes(name as FlowerType);
}
