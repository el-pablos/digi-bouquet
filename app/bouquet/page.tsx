'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlowerType, BouquetMode, BushIndex } from '@/types';
import { getRandomBushIndex } from '@/lib/flowers';
import FlowerGrid from '@/components/FlowerGrid';
import BouquetPreview from '@/components/BouquetPreview';
import BouquetMessage from '@/components/BouquetMessage';
import LoadingSpinner from '@/components/LoadingSpinner';

function BouquetBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode');
  const mode: BouquetMode = modeParam === 'mono' ? 'mono' : 'color';

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerType[]>([]);
  const [bushIndex] = useState<BushIndex>(() => getRandomBushIndex());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bouquetMeta, setBouquetMeta] = useState({ fromName: '', toName: '', message: '' });

  const handleNext = useCallback((flowers: FlowerType[]) => {
    setSelectedFlowers(flowers);
    setStep(2);
  }, []);

  function handleBack() {
    setStep(1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const response = await fetch('/api/bouquet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowers: selectedFlowers,
          mode,
          bushIndex,
          fromName: bouquetMeta.fromName.trim() || undefined,
          toName: bouquetMeta.toName.trim() || undefined,
          message: bouquetMeta.message.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan bouquet');
      }

      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black px-4">
        <div className="animate-fade-in text-center">
          <h1 className="mb-4 text-3xl font-bold uppercase tracking-widest text-white md:text-4xl">
            Bouquet Sent!
          </h1>
          <p className="text-white/60">Bouquet kamu sudah masuk ke garden.</p>
        </div>
        <BouquetPreview flowers={selectedFlowers} mode={mode} bushIndex={bushIndex} />
        <div className="flex gap-4">
          <Link
            href="/garden"
            className="rounded-lg bg-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-pink-600"
            aria-label="Lihat garden"
          >
            View Garden
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            aria-label="Kembali ke home"
          >
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-black px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
          aria-label="Kembali ke homepage"
        >
          ← Home
        </Link>
      </div>

      {step === 1 && <FlowerGrid mode={mode} onNext={handleNext} />}

      {step === 2 && (
        <div className="animate-fade-in flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-white md:text-4xl">
            Your Bouquet
          </h1>

          <BouquetPreview flowers={selectedFlowers} mode={mode} bushIndex={bushIndex} />

          <BouquetMessage onChange={(data) => setBouquetMeta(data)} />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke pemilihan bunga"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              aria-label="Kirim bouquet ke garden"
              className={`rounded-lg px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
                submitting
                  ? 'cursor-wait bg-pink-500/50 text-white/50'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              {submitting ? 'Sending...' : 'Send to Garden'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BouquetPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black"><LoadingSpinner /></div>}>
      <BouquetBuilderContent />
    </Suspense>
  );
}
