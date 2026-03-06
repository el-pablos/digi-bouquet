'use client';

import Link from 'next/link';

export default function HomeButtons() {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs">
      {/* PRIMARY — Build a Bouquet */}
      <Link
        href="/bouquet?mode=color"
        aria-label="Buat bouquet berwarna"
        className="
          group relative w-full overflow-hidden
          bg-white text-black
          px-10 py-4 rounded-none
          text-xs font-bold uppercase tracking-[0.25em]
          border-2 border-white
          transition-all duration-300
          hover:bg-transparent hover:text-white
          hover:tracking-[0.35em]
          active:scale-[0.98]
          text-center
        "
      >
        <span className="relative z-10">Build a Bouquet</span>
      </Link>

      {/* SECONDARY — Build In B&W */}
      <Link
        href="/bouquet?mode=mono"
        aria-label="Buat bouquet hitam putih"
        className="
          w-full
          bg-transparent text-white
          px-10 py-4 rounded-none
          text-xs font-semibold uppercase tracking-[0.25em]
          border border-white/50
          transition-all duration-300
          hover:border-white hover:tracking-[0.3em]
          text-center
          active:scale-[0.98]
        "
      >
        Build It in Black &amp; White
      </Link>

      {/* TERTIARY — View Garden */}
      <Link
        href="/garden"
        aria-label="Lihat garden bouquet"
        className="
          w-full text-center
          bg-transparent text-white/50
          px-10 py-3
          text-xs uppercase tracking-[0.3em]
          border border-transparent
          transition-all duration-300
          hover:text-white hover:tracking-[0.4em]
          underline-offset-4 hover:underline
        "
      >
        View Garden
      </Link>
    </div>
  );
}
