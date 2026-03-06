'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BouquetItem } from '@/types';
import BouquetCard from './BouquetCard';

interface GardenGridProps {
  bouquets: BouquetItem[];
}

const PAGE_SIZE = 20;

export default function GardenGrid({ bouquets }: GardenGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleBouquets = bouquets.slice(0, visibleCount);
  const hasMore = visibleCount < bouquets.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  if (bouquets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <p className="text-lg text-white/60">Belum ada bouquet. Jadilah yang pertama!</p>
        <Link
          href="/bouquet?mode=color"
          className="rounded-lg bg-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-pink-600"
          aria-label="Buat bouquet pertamamu"
        >
          Build a Bouquet
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visibleBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.id} bouquet={bouquet} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          aria-label="Muat lebih banyak bouquet"
          className="rounded-lg border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
        >
          Load More
        </button>
      )}
    </div>
  );
}
