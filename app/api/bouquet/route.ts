import { NextRequest, NextResponse } from 'next/server';
import { pushToList, deleteCache } from '@/lib/redis';
import { generateId } from '@/lib/utils';
import { isValidFlower } from '@/lib/flowers';
import { BouquetItem, BouquetMode, BushIndex } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flowers, mode, bushIndex, fromName, toName, message } = body;

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

    // Validate optional fields
    if (fromName !== undefined && (typeof fromName !== 'string' || fromName.length > 50)) {
      return NextResponse.json(
        { success: false, error: 'fromName harus string max 50 karakter' },
        { status: 400 }
      );
    }

    if (toName !== undefined && (typeof toName !== 'string' || toName.length > 50)) {
      return NextResponse.json(
        { success: false, error: 'toName harus string max 50 karakter' },
        { status: 400 }
      );
    }

    if (message !== undefined && (typeof message !== 'string' || message.length > 200)) {
      return NextResponse.json(
        { success: false, error: 'Message harus string max 200 karakter' },
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
      ...(fromName && { fromName: fromName.trim() }),
      ...(toName && { toName: toName.trim() }),
      ...(message && { message: message.trim() }),
    };

    // Save to Redis
    await pushToList('bouquets', JSON.stringify(bouquet));

    // Invalidate garden cache
    await deleteCache('garden:bouquets');

    return NextResponse.json({
      success: true,
      bouquetId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Gagal menyimpan bouquet: ${message}` },
      { status: 500 }
    );
  }
}
