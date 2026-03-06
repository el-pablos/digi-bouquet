import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4">
      {/* Decorative peony - top left */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-30 md:h-96 md:w-96">
        <Image
          src="https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/flowers/peony.webp"
          alt="Bunga peony dekoratif"
          fill
          sizes="(max-width: 768px) 256px, 384px"
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Decorative peony - bottom right */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rotate-180 opacity-30 md:h-96 md:w-96">
        <Image
          src="https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/flowers/peony.webp"
          alt="Bunga peony dekoratif"
          fill
          sizes="(max-width: 768px) 256px, 384px"
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="animate-fade-in z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="relative h-20 w-20 md:h-28 md:w-28">
          <Image
            src="https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/other/digibouquet.png"
            alt="Digi-Bouquet logo"
            fill
            sizes="112px"
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl font-bold uppercase tracking-widest text-white md:text-6xl lg:text-7xl">
          Beautiful Flowers
          <br />
          <span className="text-pink-400">Delivered Digitally</span>
        </h1>

        {/* Navigation buttons */}
        <HomeButtons />

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-2 text-xs text-white/40">
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/70"
            aria-label="Powered by Vercel"
          >
            POWERED BY ▲ VERCEL
          </a>
          <span className="text-white/40">MADE BY TAMA</span>
          <a
            href="https://x.com/pau_wee_"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/70"
            aria-label="Inspired by pau_wee_"
          >
            INSPIRED BY @PAU_WEE_
          </a>
        </footer>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  );
}
