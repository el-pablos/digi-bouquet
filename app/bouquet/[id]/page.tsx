import Image from 'next/image';
import Link from 'next/link';
import { getList, getCache, setCache } from '@/lib/redis';
import { BouquetItem } from '@/types';
import BouquetPreview from '@/components/BouquetPreview';
import ShareButtons from '@/components/ShareButtons';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBouquet(id: string): Promise<BouquetItem | null> {
  try {
    const cacheKey = `bouquet:${id}`;
    const cached = await getCache(cacheKey);
    if (cached) return JSON.parse(cached) as BouquetItem;

    const rawBouquets = await getList('bouquets');
    const bouquet = rawBouquets
      .map((raw) => JSON.parse(raw) as BouquetItem)
      .find((b) => b.id === id);

    if (!bouquet) return null;

    await setCache(cacheKey, JSON.stringify(bouquet), 300);
    return bouquet;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const bouquet = await getBouquet(id);

  if (!bouquet) {
    return { title: 'Bouquet tidak ditemukan — Digi-Bouquet' };
  }

  const toName = bouquet.toName || 'kamu';
  return {
    title: `Bouquet untuk ${toName} — Digi-Bouquet`,
    description: bouquet.message || `Karangan bunga digital spesial untuk ${toName}`,
    openGraph: {
      title: `Bouquet untuk ${toName}`,
      description: bouquet.message || 'Lihat karangan bunga digital yang cantik ini!',
      type: 'website',
    },
  };
}

export default async function BouquetViewPage({ params }: PageProps) {
  const { id } = await params;
  const bouquet = await getBouquet(id);

  if (!bouquet) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#f5f0e8] px-4">
        <p className="text-2xl text-gray-700">Bouquet tidak ditemukan 🥀</p>
        <Link
          href="/"
          className="border border-black px-6 py-2 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
        >
          Kembali ke Homepage
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f5f0e8] px-4 py-12">
      {/* Logo */}
      <div className="relative mb-6 h-16 w-48 md:h-20 md:w-60">
        <Image
          src="https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/other/digibouquet.png"
          alt="Digi-Bouquet logo"
          fill
          sizes="240px"
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      {/* Sub-heading */}
      <p className="mb-8 text-center font-mono text-xl text-gray-700 md:text-2xl">
        Hi, I made this bouquet for you!
      </p>

      {/* Bouquet display */}
      <div className="mb-8 w-full max-w-sm">
        <BouquetPreview
          flowers={bouquet.flowers}
          mode={bouquet.mode}
          bushIndex={bouquet.bushIndex}
        />
      </div>

      {/* Romantic card */}
      <div className="mb-8 max-w-[280px] rounded-sm border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <p className="mb-2 font-serif text-sm italic text-gray-700">
          Dear {bouquet.toName || 'You'},
        </p>
        {bouquet.message && (
          <p className="mb-3 text-center text-sm text-gray-600">
            {bouquet.message}
          </p>
        )}
        <p className="text-right font-serif text-sm italic text-gray-700">
          Sincerely,
          <br />
          {bouquet.fromName || 'Someone'}
        </p>
      </div>

      {/* Share buttons */}
      <ShareButtons bouquet={bouquet} />

      {/* Footer */}
      <div className="mt-12">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-600"
        >
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
