'use client';

import { useState } from 'react';
import { BouquetItem } from '@/types';
import { generateWhatsAppMessage, generateWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppShareProps {
  bouquet: BouquetItem;
  onClose: () => void;
}

export default function WhatsAppShare({ bouquet, onClose }: WhatsAppShareProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const message = generateWhatsAppMessage(bouquet);

  function handleSend() {
    const normalized = phoneNumber.replace(/\D/g, '');
    if (normalized.length < 10) {
      setError('Nomor WhatsApp minimal 10 digit');
      return;
    }
    setError('');
    const url = generateWhatsAppUrl(phoneNumber, message);
    window.open(url, '_blank');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-label="Kirim via WhatsApp"
    >
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-1 text-lg font-bold text-gray-900">
          Kirim via WhatsApp 💚
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Masukkan nomor WhatsApp tujuan
        </p>

        <label htmlFor="wa-phone" className="mb-1 block text-sm font-medium text-gray-700">
          Nomor WhatsApp
        </label>
        <input
          id="wa-phone"
          type="tel"
          placeholder="628xxxxxxxxxx"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError('');
          }}
          className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <p className="mb-3 text-xs text-gray-400">
          Format: 628xxx atau 08xxx, tanpa spasi dan tanda +
        </p>

        {error && (
          <p className="mb-3 text-xs text-red-500" role="alert">{error}</p>
        )}

        <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
            className="rounded"
          />
          Tampilkan preview pesan
        </label>

        {showPreview && (
          <div className="mb-4 max-h-48 overflow-y-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 whitespace-pre-wrap">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={!phoneNumber.replace(/\D/g, '')}
          aria-label="Kirim sekarang via WhatsApp"
          className="mb-2 w-full rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          KIRIM SEKARANG 💬
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Batal kirim WhatsApp"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
