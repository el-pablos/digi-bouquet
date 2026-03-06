export type FlowerType =
  | 'orchid'
  | 'tulip'
  | 'dahlia'
  | 'anemone'
  | 'carnation'
  | 'zinnia'
  | 'ranunculus'
  | 'sunflower'
  | 'lily'
  | 'daisy'
  | 'peony'
  | 'rose';

export type BouquetMode = 'color' | 'mono';

export type BushIndex = 1 | 2 | 3;

export interface BouquetItem {
  id: string;
  flowers: FlowerType[];
  mode: BouquetMode;
  bushIndex: BushIndex;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GardenResponse {
  bouquets: BouquetItem[];
  total: number;
}

export interface FlowerSelectionState {
  selectedFlowers: FlowerType[];
  mode: BouquetMode;
}

export interface FlowerData {
  name: FlowerType;
  label: string;
}

export const MIN_FLOWERS = 6;
export const MAX_FLOWERS = 10;
