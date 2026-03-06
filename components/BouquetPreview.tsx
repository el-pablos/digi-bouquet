'use client';

import Image from 'next/image';
import { FlowerType, BouquetMode, BushIndex } from '@/types';
import { getFlowerImageUrl, getBushBackgroundUrl, getBushTopUrl } from '@/lib/flowers';

interface BouquetPreviewProps {
  flowers: FlowerType[];
  mode: BouquetMode;
  bushIndex: BushIndex;
}

const FLOWER_POSITIONS = [
  { top: '20%', left: '30%', rotate: -15, scale: 1.0 },
  { top: '15%', left: '55%', rotate: 10, scale: 0.95 },
  { top: '30%', left: '15%', rotate: -25, scale: 0.9 },
  { top: '25%', left: '70%', rotate: 20, scale: 0.85 },
  { top: '35%', left: '42%', rotate: 5, scale: 1.05 },
  { top: '40%', left: '25%', rotate: -10, scale: 0.9 },
  { top: '18%', left: '45%', rotate: 15, scale: 1.0 },
  { top: '32%', left: '60%', rotate: -5, scale: 0.95 },
  { top: '22%', left: '20%', rotate: 25, scale: 0.85 },
  { top: '28%', left: '50%', rotate: -20, scale: 1.0 },
];

export default function BouquetPreview({ flowers, mode, bushIndex }: BouquetPreviewProps) {
  const bushBgUrl = getBushBackgroundUrl(bushIndex, mode);
  const bushTopUrl = getBushTopUrl(bushIndex, mode);

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl"
      role="img"
      aria-label={`Preview bouquet ${mode} dengan ${flowers.length} bunga`}
    >
      {/* Layer 1: Bush background */}
      <Image
        src={bushBgUrl}
        alt="Bush background"
        fill
        sizes="(max-width: 640px) 100vw, 384px"
        className="object-cover"
        priority
        unoptimized
      />

      {/* Layer 2: Flowers */}
      {flowers.map((flower, index) => {
        const pos = FLOWER_POSITIONS[index % FLOWER_POSITIONS.length];
        return (
          <div
            key={`${flower}-${index}`}
            className="absolute h-20 w-20 md:h-24 md:w-24"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              zIndex: 10 + index,
            }}
          >
            <Image
              src={getFlowerImageUrl(flower, mode)}
              alt={`Bunga ${flower}`}
              fill
              sizes="96px"
              className="object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
        );
      })}

      {/* Layer 3: Bush top overlay */}
      <Image
        src={bushTopUrl}
        alt="Bush top overlay"
        fill
        sizes="(max-width: 640px) 100vw, 384px"
        className="object-cover"
        style={{ zIndex: 20 }}
        unoptimized
      />
    </div>
  );
}
