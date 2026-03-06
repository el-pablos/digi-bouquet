'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BouquetItem } from '@/types';
import GardenGrid from '@/components/GardenGrid';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function GardenPage() {
  const [bouquets, setBouquets] = useState<BouquetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBouquets() {
      try {
        const response = await fetch('/api/garden');
        if (!response.ok) {
          throw new Error('Gagal memuat bouquet');
        }
        const data = await response.json();
        setBouquets(data.bouquets || []);
      } catch {
        setError('Gagal memuat bouquet. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }

    fetchBouquets();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
          aria-label="Kembali ke homepage"
        >
          ← Home
        </Link>
      </div>

      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold uppercase tracking-widest text-white md:text-4xl">
          Our Garden
        </h1>
        <p className="text-sm text-white/50">
          A peek at some of the bouquets people have made!
        </p>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="py-12 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="w-full max-w-6xl">
          <GardenGrid bouquets={bouquets} />
        </div>
      )}
    </main>
  );
}
