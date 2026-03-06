'use client';

import { useState, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'DUyvYKa7sI4';

type MusicStatus = 'muted' | 'playing' | 'paused';

function getYouTubeEmbedUrl(muted: boolean): string {
  const origin =
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
      : 'https://digibouquet.tams.codes';
  return `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&mute=${muted ? 1 : 0}&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
}

export default function MusicPlayer() {
  const [status, setStatus] = useState<MusicStatus>('muted');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleToggle() {
    setStatus((prev) => {
      if (prev === 'muted') return 'playing';
      if (prev === 'playing') return 'paused';
      return 'playing';
    });
  }

  const tooltips: Record<MusicStatus, string> = {
    muted: 'Klik untuk unmute',
    playing: 'Hentikan musik',
    paused: 'Putar musik',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
      {/* Hidden YouTube iframe for audio playback */}
      {status !== 'paused' && (
        <iframe
          ref={iframeRef}
          src={getYouTubeEmbedUrl(status === 'muted')}
          title="Kacamata — Afgan"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute opacity-0"
          style={{ width: '1px', height: '1px' }}
          aria-hidden="true"
        />
      )}

      {/* Play/Pause/Unmute button */}
      <button
        type="button"
        onClick={handleToggle}
        title={tooltips[status]}
        aria-label={tooltips[status]}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-pink-400/50 bg-pink-500/20 transition-all hover:bg-pink-500/40 ${
          status === 'playing'
            ? 'animate-pulse shadow-lg shadow-pink-500/20'
            : status === 'muted'
              ? 'animate-pulse shadow-md shadow-pink-500/10'
              : ''
        }`}
      >
        {status === 'playing' ? (
          /* Pause icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-pink-300"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : status === 'muted' ? (
          /* Muted speaker icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-pink-300"
            aria-hidden="true"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M16.5 12l4.5-4.5-1.4-1.4L15 10.6l-4.5-4.5-1.4 1.4L13.6 12l-4.5 4.5 1.4 1.4L15 13.4l4.5 4.5 1.4-1.4L16.5 12z" opacity="0.6" />
          </svg>
        ) : (
          /* Play icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-pink-300"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Song label */}
      <span className="text-center text-[10px] text-white/40">
        {status === 'muted'
          ? 'Kacamata — Afgan (muted)'
          : status === 'playing'
            ? 'Kacamata — Afgan ♪'
            : 'Kacamata — Afgan'}
      </span>
    </div>
  );
}
