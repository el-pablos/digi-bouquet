'use client';

import Image from 'next/image';
import { BouquetItem } from '@/types';
import { getFlowerImageUrl, getBushBackgroundUrl, getBushTopUrl } from '@/lib/flowers';
import { formatDate } from '@/lib/utils';

interface BouquetCardProps {
  bouquet: BouquetItem;
}

const CARD_FLOWER_POSITIONS = [
  { top: '18%', left: '28%', rotate: -12, scale: 0.8 },
  { top: '14%', left: '52%', rotate: 8, scale: 0.75 },
  { top: '28%', left: '18%', rotate: -20, scale: 0.7 },
  { top: '24%', left: '65%', rotate: 15, scale: 0.7 },
  { top: '32%', left: '40%', rotate: 5, scale: 0.85 },
  { top: '36%', left: '22%', rotate: -8, scale: 0.7 },
  { top: '16%', left: '40%', rotate: 12, scale: 0.8 },
  { top: '30%', left: '58%', rotate: -5, scale: 0.75 },
  { top: '20%', left: '15%', rotate: 22, scale: 0.7 },
  { top: '26%', left: '48%', rotate: -18, scale: 0.8 },
];

export default function BouquetCard({ bouquet }: BouquetCardProps) {
  const { flowers, mode, bushIndex, createdAt } = bouquet;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#fdf8f3]/10 transition-all hover:border-pink-400/30 hover:shadow-lg hover:shadow-pink-400/10">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f0e8]">
        {/* Layer 1: Bush background */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '75%' }}>
          <Image
            src={getBushBackgroundUrl(bushIndex, mode)}
            alt="Bush background"
            fill
            sizes="(max-width: 640px) 50vw, 250px"
            className="object-contain object-bottom"
            unoptimized
          />
        </div>

        {/* Layer 2: Flowers */}
        {flowers.map((flower, index) => {
          const pos = CARD_FLOWER_POSITIONS[index % CARD_FLOWER_POSITIONS.length];
          return (
            <div
              key={`${flower}-${index}`}
              className="absolute h-12 w-12 sm:h-14 sm:w-14"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                zIndex: 10 + index,
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))',
              }}
            >
              <Image
                src={getFlowerImageUrl(flower, mode)}
                alt={`Bunga ${flower}`}
                fill
                sizes="56px"
                className="object-contain drop-shadow-md"
                unoptimized
              />
            </div>
          );
        })}

        {/* Layer 3: Bush top overlay */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '45%', zIndex: 20 }}>
          <Image
            src={getBushTopUrl(bushIndex, mode)}
            alt="Bush top overlay"
            fill
            sizes="(max-width: 640px) 50vw, 250px"
            className="object-contain object-bottom"
            unoptimized
          />
        </div>
      </div>

      <div className="px-3 py-2 text-center">
        <p className="text-xs text-white/50">{formatDate(createdAt)}</p>
        <div className="mt-2 space-y-0.5 border-t border-white/5 pt-2">
          <p className="text-xs text-pink-300/70">
            {bouquet.fromName || 'Anonim'} ♥ {bouquet.toName || 'Seseorang'}
          </p>
          {bouquet.message && (
            <p className="overflow-hidden text-[11px] italic leading-snug text-white/40 line-clamp-2">
              {bouquet.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
