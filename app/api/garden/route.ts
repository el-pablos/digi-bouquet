import { NextResponse } from 'next/server';
import { getCache, setCache, getList } from '@/lib/redis';
import { BouquetItem } from '@/types';

const CACHE_KEY = 'garden:bouquets';
const CACHE_TTL = 60;

export async function GET() {
  try {
    // Check cache first
    const cached = await getCache(CACHE_KEY);
    if (cached) {
      const bouquets: BouquetItem[] = JSON.parse(cached);
      return NextResponse.json({
        bouquets,
        total: bouquets.length,
      });
    }

    // Cache miss — fetch from Redis list
    const rawBouquets = await getList('bouquets');
    const bouquets: BouquetItem[] = rawBouquets.map((raw) => JSON.parse(raw));

    // Store in cache
    await setCache(CACHE_KEY, JSON.stringify(bouquets), CACHE_TTL);

    return NextResponse.json({
      bouquets,
      total: bouquets.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Gagal mengambil data garden: ${message}` },
      { status: 500 }
    );
  }
}
