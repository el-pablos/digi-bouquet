'use client';

import Image from 'next/image';
import { FlowerType, BouquetMode } from '@/types';
import { getFlowerImageUrl } from '@/lib/flowers';

interface FlowerItemProps {
  flower: FlowerType;
  label: string;
  mode: BouquetMode;
  count: number;
  onSelect: (flower: FlowerType) => void;
  disabled: boolean;
}

export default function FlowerItem({ flower, label, mode, count, onSelect, disabled }: FlowerItemProps) {
  const imageUrl = getFlowerImageUrl(flower, mode);

  function handleClick() {
    if (!disabled) {
      onSelect(flower);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Pilih bunga ${label}${count > 0 ? `, sudah dipilih ${count} kali` : ''}`}
      className={`group relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all duration-200 ${
        count > 0
          ? 'border-pink-400 bg-pink-400/10 shadow-lg shadow-pink-400/20'
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
      } ${disabled && count === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-md transition-transform duration-200 group-hover:scale-105">
        <Image
          src={imageUrl}
          alt={`Bunga ${label}`}
          fill
          sizes="96px"
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-white/80">
        {label}
      </span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
