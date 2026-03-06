'use client';

import { useState, useCallback } from 'react';
import { FlowerType, BouquetMode, MAX_FLOWERS, MIN_FLOWERS } from '@/types';
import { FLOWERS } from '@/lib/flowers';
import FlowerItem from './FlowerItem';

interface FlowerGridProps {
  mode: BouquetMode;
  onNext: (selectedFlowers: FlowerType[]) => void;
}

export default function FlowerGrid({ mode, onNext }: FlowerGridProps) {
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerType[]>([]);

  const totalSelected = selectedFlowers.length;
  const canAddMore = totalSelected < MAX_FLOWERS;
  const canProceed = totalSelected >= MIN_FLOWERS;

  const handleSelect = useCallback(
    (flower: FlowerType) => {
      if (totalSelected < MAX_FLOWERS) {
        setSelectedFlowers((prev) => [...prev, flower]);
      }
    },
    [totalSelected]
  );

  function handleReset() {
    setSelectedFlowers([]);
  }

  function handleNext() {
    if (canProceed) {
      onNext(selectedFlowers);
    }
  }

  function getFlowerCount(flower: FlowerType): number {
    return selectedFlowers.filter((f) => f === flower).length;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold uppercase tracking-widest text-white md:text-4xl">
          Pick 6 to 10 Blooms
        </h1>
        <p className="text-lg font-semibold text-pink-400">
          {totalSelected}/{MAX_FLOWERS}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4">
        {FLOWERS.map((flower) => (
          <FlowerItem
            key={flower.name}
            flower={flower.name}
            label={flower.label}
            mode={mode}
            count={getFlowerCount(flower.name)}
            onSelect={handleSelect}
            disabled={!canAddMore}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset semua pilihan bunga"
          className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          aria-label="Lanjut ke preview bouquet"
          className={`rounded-lg px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
            canProceed
              ? 'bg-pink-500 text-white hover:bg-pink-600'
              : 'cursor-not-allowed bg-white/10 text-white/30'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
