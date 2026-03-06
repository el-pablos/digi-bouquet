'use client';

import { useState, useCallback } from 'react';

interface BouquetMessageProps {
  onChange: (data: { fromName: string; toName: string; message: string }) => void;
}

export default function BouquetMessage({ onChange }: BouquetMessageProps) {
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');
  const [message, setMessage] = useState('');

  const emitChange = useCallback(
    (from: string, to: string, msg: string) => {
      onChange({ fromName: from, toName: to, message: msg });
    },
    [onChange]
  );

  function handleFromChange(value: string) {
    const trimmed = value.slice(0, 50);
    setFromName(trimmed);
    emitChange(trimmed, toName, message);
  }

  function handleToChange(value: string) {
    const trimmed = value.slice(0, 50);
    setToName(trimmed);
    emitChange(fromName, trimmed, message);
  }

  function handleMessageChange(value: string) {
    const trimmed = value.slice(0, 200);
    setMessage(trimmed);
    emitChange(fromName, toName, trimmed);
  }

  function getCounterColor(): string {
    if (message.length >= 200) return 'text-red-400';
    if (message.length > 180) return 'text-orange-400';
    return 'text-white/30';
  }

  const inputClasses =
    'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:border-pink-400/50 focus:outline-none focus:ring-1 focus:ring-pink-400/30 transition-colors duration-200';

  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-1 font-medium text-white/80">
        Untuk siapa bouquet ini? 🌸
      </h3>
      <p className="mb-4 text-xs text-white/40">
        Opsional • Biarkan kosong jika ingin anonim
      </p>

      <div className="flex flex-col gap-3">
        {/* From input */}
        <div>
          <label htmlFor="from-name" className="mb-1 block text-xs text-white/50">
            Dari:
          </label>
          <input
            id="from-name"
            type="text"
            placeholder="Namamu (opsional)"
            maxLength={50}
            value={fromName}
            onChange={(e) => handleFromChange(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* To input */}
        <div>
          <label htmlFor="to-name" className="mb-1 block text-xs text-white/50">
            Untuk:
          </label>
          <input
            id="to-name"
            type="text"
            placeholder="Nama penerima (opsional)"
            maxLength={50}
            value={toName}
            onChange={(e) => handleToChange(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* Message textarea */}
        <div>
          <label htmlFor="bouquet-message" className="mb-1 block text-xs text-white/50">
            Pesan:
          </label>
          <div className="relative">
            <textarea
              id="bouquet-message"
              placeholder="Tulis pesan manis di sini... (opsional, max 200 karakter)"
              maxLength={200}
              rows={3}
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              className={`${inputClasses} resize-none`}
            />
            <span
              className={`absolute bottom-2 right-2 text-[10px] ${getCounterColor()}`}
              data-testid="char-counter"
            >
              {message.length} / 200
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
