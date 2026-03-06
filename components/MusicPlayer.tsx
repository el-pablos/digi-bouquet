'use client';

import { useState, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'DUyvYKa7sI4';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function getYouTubeEmbedUrl(): string {
    const origin =
      typeof window !== 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
        : '';
    return `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&mute=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
  }

  function handleToggle() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
      {/* Hidden YouTube iframe for audio playback */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          src={getYouTubeEmbedUrl()}
          title="Kacamata — Afgan"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute opacity-0"
          style={{ width: '1px', height: '1px' }}
          aria-hidden="true"
        />
      )}

      {/* Play/Pause button */}
      <button
        type="button"
        onClick={handleToggle}
        title={isPlaying ? 'Hentikan musik' : 'Putar musik'}
        aria-label={isPlaying ? 'Hentikan musik' : 'Putar musik'}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-pink-400/50 bg-pink-500/20 transition-all hover:bg-pink-500/40 ${
          isPlaying ? 'animate-pulse shadow-lg shadow-pink-500/20' : ''
        }`}
      >
        {isPlaying ? (
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
        Kacamata — Afgan
      </span>
    </div>
  );
}
