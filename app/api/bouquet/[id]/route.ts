import { NextRequest, NextResponse } from 'next/server';
import { getList, getCache, setCache } from '@/lib/redis';
import { BouquetItem } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID tidak boleh kosong' },
      { status: 400 }
    );
  }

  try {
    // Cek cache per-bouquet
    const cacheKey = `bouquet:${id}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json({ success: true, bouquet: JSON.parse(cached) });
    }

    // Fetch dari Redis list
    const rawBouquets = await getList('bouquets');
    const bouquet = rawBouquets
      .map((raw) => JSON.parse(raw) as BouquetItem)
      .find((b) => b.id === id);

    if (!bouquet) {
      return NextResponse.json(
        { success: false, error: 'Bouquet tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cache 5 menit
    await setCache(cacheKey, JSON.stringify(bouquet), 300);

    return NextResponse.json({ success: true, bouquet });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
