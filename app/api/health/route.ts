import { NextResponse } from 'next/server';
import { ping } from '@/lib/redis';

export async function GET() {
  try {
    const result = await ping();
    return NextResponse.json({
      success: true,
      data: { redis: result, status: 'healthy', timestamp: new Date().toISOString() },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Redis connection failed: ${message}` },
      { status: 503 }
    );
  }
}
