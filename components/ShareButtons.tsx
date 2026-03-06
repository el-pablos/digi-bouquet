'use client';

import { useState, useEffect } from 'react';
import { BouquetItem } from '@/types';
import WhatsAppShare from './WhatsAppShare';

interface ShareButtonsProps {
  bouquet: BouquetItem;
}

export default function ShareButtons({ bouquet }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: `Bouquet untuk ${bouquet.toName || 'kamu'}`,
        url: window.location.href,
      });
    } catch {
      // user cancelled or not supported
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Link sudah disalin' : 'Salin link bouquet'}
          className={`border border-black px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${
            copied
              ? 'bg-black text-white'
              : 'bg-transparent text-black hover:bg-black/5'
          }`}
        >
          {copied ? '✓ COPIED!' : 'COPY LINK'}
        </button>

        {canShare && (
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share bouquet"
            className="border border-black bg-black px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-black/80"
          >
            SHARE
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowWhatsApp(true)}
          aria-label="Kirim bouquet via WhatsApp"
          className="bg-green-500 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-green-600"
        >
          KIRIM VIA WHATSAPP 💬
        </button>
      </div>

      {showWhatsApp && (
        <WhatsAppShare
          bouquet={bouquet}
          onClose={() => setShowWhatsApp(false)}
        />
      )}
    </>
  );
}
