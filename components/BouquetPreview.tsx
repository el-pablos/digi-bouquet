'use client';

import Image from 'next/image';
import { FlowerType, BouquetMode, BushIndex } from '@/types';
import { getFlowerImageUrl, getBushBackgroundUrl, getBushTopUrl } from '@/lib/flowers';

interface BouquetPreviewProps {
  flowers: FlowerType[];
  mode: BouquetMode;
  bushIndex: BushIndex;
  positionSeed?: number;
}

const FLOWER_POSITIONS = [
  // Top center — focal flower
  { top: '12%', left: '42%', rotate: 0, scale: 1.05, size: '90px' },
  // Left wing upper
  { top: '18%', left: '22%', rotate: -22, scale: 0.92, size: '84px' },
  // Right wing upper
  { top: '18%', left: '62%', rotate: 22, scale: 0.92, size: '84px' },
  // Left mid
  { top: '28%', left: '10%', rotate: -35, scale: 0.85, size: '78px' },
  // Right mid
  { top: '28%', left: '72%', rotate: 35, scale: 0.85, size: '78px' },
  // Center-bottom left
  { top: '35%', left: '32%', rotate: -10, scale: 0.95, size: '86px' },
  // Center-bottom right
  { top: '35%', left: '52%', rotate: 10, scale: 0.95, size: '86px' },
  // Fill upper center
  { top: '22%', left: '48%', rotate: 5, scale: 0.88, size: '80px' },
  // Fill left
  { top: '24%', left: '30%', rotate: -15, scale: 0.82, size: '76px' },
  // Fill right
  { top: '24%', left: '60%', rotate: 18, scale: 0.82, size: '76px' },
];

function shufflePositions(positions: typeof FLOWER_POSITIONS, seed: number) {
  const arr = [...positions];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function BouquetPreview({ flowers, mode, bushIndex, positionSeed = 0 }: BouquetPreviewProps) {
  const bushBgUrl = getBushBackgroundUrl(bushIndex, mode);
  const bushTopUrl = getBushTopUrl(bushIndex, mode);
  const positions = positionSeed === 0
    ? FLOWER_POSITIONS
    : shufflePositions(FLOWER_POSITIONS, positionSeed);

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[#f5f0e8] shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
      role="img"
      aria-label={`Preview bouquet ${mode} dengan ${flowers.length} bunga`}
    >
      {/* Subtle radial glow for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 65%, rgba(255,220,200,0.45) 0%, transparent 80%)',
        }}
      />

      {/* Layer 1: Bush background — contain instead of cover for natural look */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '75%' }}>
        <Image
          src={bushBgUrl}
          alt="Bush background"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-contain object-bottom"
          priority
          unoptimized
        />
      </div>

      {/* Layer 2: Flowers arranged in fan/dome pattern */}
      {flowers.map((flower, index) => {
        const pos = positions[index % positions.length];
        return (
          <div
            key={`${flower}-${index}`}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.size || '80px',
              height: pos.size || '80px',
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              zIndex: 20 + index,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))',
            }}
          >
            <Image
              src={getFlowerImageUrl(flower, mode)}
              alt={`Bunga ${flower}`}
              fill
              sizes="96px"
              className="object-contain"
              unoptimized
            />
          </div>
        );
      })}

      {/* Layer 3: Bush top overlay — flowers appear tucked into greenery */}
      <div className="absolute bottom-0 left-0 right-0 z-30" style={{ height: '45%' }}>
        <Image
          src={bushTopUrl}
          alt="Bush top overlay"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-contain object-bottom"
          unoptimized
        />
      </div>
    </div>
  );
}
