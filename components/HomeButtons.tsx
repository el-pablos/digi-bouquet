'use client';

import Link from 'next/link';

export default function HomeButtons() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        href="/bouquet?mode=color"
        aria-label="Buat bouquet berwarna"
        className="w-full max-w-xs rounded-lg border-2 border-white/80 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
      >
        Build a Bouquet
      </Link>
      <Link
        href="/bouquet?mode=mono"
        aria-label="Buat bouquet hitam putih"
        className="w-full max-w-xs rounded-lg border-2 border-white/80 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
      >
        Build It in Black and White
      </Link>
      <Link
        href="/garden"
        aria-label="Lihat garden bouquet"
        className="w-full max-w-xs rounded-lg border-2 border-white/80 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
      >
        View Garden
      </Link>
    </div>
  );
}
