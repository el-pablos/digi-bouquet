import { NextRequest, NextResponse } from 'next/server';
import { pushToList, deleteCache } from '@/lib/redis';
import { generateId } from '@/lib/utils';
import { isValidFlower } from '@/lib/flowers';
import { BouquetItem, BouquetMode, BushIndex } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flowers, mode, bushIndex } = body;

    // Validate flowers
    if (!Array.isArray(flowers) || flowers.length < 6 || flowers.length > 10) {
      return NextResponse.json(
        { success: false, error: 'Flowers harus berupa array dengan 6-10 item' },
        { status: 400 }
      );
    }

    for (const flower of flowers) {
      if (typeof flower !== 'string' || !isValidFlower(flower)) {
        return NextResponse.json(
          { success: false, error: `Flower tidak valid: ${flower}` },
          { status: 400 }
        );
      }
    }

    // Validate mode
    if (mode !== 'color' && mode !== 'mono') {
      return NextResponse.json(
        { success: false, error: 'Mode harus "color" atau "mono"' },
        { status: 400 }
      );
    }

    // Validate bushIndex
    if (bushIndex !== 1 && bushIndex !== 2 && bushIndex !== 3) {
      return NextResponse.json(
        { success: false, error: 'bushIndex harus 1, 2, atau 3' },
        { status: 400 }
      );
    }

    const bouquetId = generateId();

    const bouquet: BouquetItem = {
      id: bouquetId,
      flowers: flowers,
      mode: mode as BouquetMode,
      bushIndex: bushIndex as BushIndex,
      createdAt: new Date().toISOString(),
    };

    // Save to Redis
    await pushToList('bouquets', JSON.stringify(bouquet));

    // Invalidate garden cache
    await deleteCache('garden:bouquets');

    return NextResponse.json({
      success: true,
      data: { bouquetId },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Gagal menyimpan bouquet: ${message}` },
      { status: 500 }
    );
  }
}
